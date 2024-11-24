import Papa from 'papaparse';
import { supabase } from '../lib/supabase';
import type { GeneratedArticle } from '../types';

async function uploadToStorage(csvBlob: Blob, fileName: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('exports')
    .upload(`${fileName}`, csvBlob, {
      contentType: 'text/csv',
      cacheControl: '3600',
      upsert: true
    });

  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('exports')
    .getPublicUrl(data.path);

  return publicUrl;
}

export async function exportToCSV(articles: GeneratedArticle[]) {
  try {
    // First, save articles to the database if they're not already saved
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    for (const article of articles) {
      const { error } = await supabase
        .from('generated_content')
        .upsert({
          user_id: user.user.id,
          base_headline: article.baseHeadline,
          variation_type: article.variation.split(':')[0],
          variation_value: article.variation.split(':')[1],
          title: article.title,
          content: article.content,
          metadata: article.metadata,
          seo_data: article.seo,
          schema_data: article.schema
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error('Error saving article:', error);
        throw error;
      }
    }

    // Then fetch all content using our database function
    const { data: exportData, error: exportError } = await supabase
      .from('export_generated_content_csv')
      .select('*')
      .eq('user_id_param', user.user.id);

    if (exportError) {
      console.error('Error exporting data:', exportError);
      throw exportError;
    }

    if (!exportData) {
      throw new Error('No data returned from export function');
    }

    // Transform the data for CSV export
    const csvData = exportData.map(article => ({
      // Basic Information
      id: article.content_id,
      articleType: article.article_type,
      baseHeadline: article.base_headline,
      variationType: article.variation_type,
      variationValue: article.variation_value,
      title: article.title,
      
      // Content
      content: article.content,
      
      // Metadata
      location: article.metadata?.city 
        ? `${article.metadata.city}, ${article.metadata.state}`
        : '',
      population: article.metadata?.population || '',
      demographic: article.metadata?.demographic || '',
      year: article.metadata?.year || '',
      
      // SEO Data
      metaTitle: article.seo_data?.metaTitle || '',
      metaDescription: article.seo_data?.metaDescription || '',
      focusKeywords: Array.isArray(article.seo_data?.focusKeywords) 
        ? article.seo_data.focusKeywords.join('; ')
        : '',
      slug: article.seo_data?.slug || '',
      canonicalUrl: article.seo_data?.canonicalUrl || '',
      
      // Schema Data
      schemaType: article.schema_data?.['@type'] || 'Article',
      schemaHeadline: article.schema_data?.data?.headline || '',
      schemaKeywords: Array.isArray(article.schema_data?.data?.keywords)
        ? article.schema_data.data.keywords.join('; ')
        : '',
      
      // Timestamps
      createdAt: new Date(article.created_at).toLocaleString(),
      updatedAt: new Date(article.updated_at).toLocaleString()
    }));

    // Generate CSV
    const csv = Papa.unparse(csvData, {
      quotes: true,
      delimiter: ',',
      header: true
    });

    // Create blob and generate file name
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const fileName = `content-export-${new Date().toISOString().split('T')[0]}.csv`;

    // Upload to storage and get public URL
    const fileUrl = await uploadToStorage(blob, fileName);

    // Save export record
    const { error: historyError } = await supabase
      .from('export_history')
      .insert({
        user_id: user.user.id,
        file_name: fileName,
        file_url: fileUrl,
        article_count: articles.length,
        status: 'completed'
      });

    if (historyError) {
      console.error('Error saving export history:', historyError);
      throw historyError;
    }

    // Download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

  } catch (error) {
    console.error('Export failed:', error);
    
    // If user is authenticated, save failed export record
    const { data: user } = await supabase.auth.getUser();
    if (user.user) {
      await supabase
        .from('export_history')
        .insert({
          user_id: user.user.id,
          file_name: `failed-export-${new Date().toISOString().split('T')[0]}.csv`,
          file_url: '',
          article_count: articles.length,
          status: 'failed'
        });
    }
    
    throw error;
  }
}