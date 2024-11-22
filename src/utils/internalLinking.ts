import type { GeneratedArticle, InternalLink } from '../types/content';

const NEARBY_CITY_RADIUS = 50; // miles
const MAX_INTERNAL_LINKS = 5;
const MAX_NEARBY_CITY_LINKS = 3;

export function generateInternalLinks(
  article: GeneratedArticle,
  allArticles: GeneratedArticle[]
): InternalLink[] {
  const links: InternalLink[] = [];
  
  // 1. Links to articles in the same city
  const sameCityArticles = allArticles.filter(a => 
    a.metadata.location.city === article.metadata.location.city &&
    a.metadata.topic !== article.metadata.topic
  );

  // 2. Links to same topic in nearby cities
  const nearbyCityArticles = allArticles.filter(a =>
    a.metadata.topic === article.metadata.topic &&
    a.metadata.location.city !== article.metadata.location.city &&
    isNearby(article.metadata.location, a.metadata.location)
  );

  // Add same-city links
  sameCityArticles
    .slice(0, MAX_INTERNAL_LINKS)
    .forEach(relatedArticle => {
      links.push({
        title: relatedArticle.content.title,
        url: generateArticleUrl(relatedArticle),
        type: 'same-city',
        relevanceScore: calculateRelevance(article, relatedArticle)
      });
    });

  // Add nearby-city links
  nearbyCityArticles
    .slice(0, MAX_NEARBY_CITY_LINKS)
    .forEach(relatedArticle => {
      links.push({
        title: relatedArticle.content.title,
        url: generateArticleUrl(relatedArticle),
        type: 'nearby-city',
        relevanceScore: calculateRelevance(article, relatedArticle)
      });
    });

  return links.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

function isNearby(loc1: any, loc2: any): boolean {
  // Implement distance calculation between cities
  // This would use the Haversine formula with city coordinates
  // For now, we'll use a simple state-based check
  return loc1.state === loc2.state;
}

function calculateRelevance(article1: GeneratedArticle, article2: GeneratedArticle): number {
  let score = 0;
  
  // Same topic category
  if (article1.metadata.topic === article2.metadata.topic) score += 0.5;
  
  // Same target demographic
  if (article1.metadata.demographic === article2.metadata.demographic) score += 0.3;
  
  // Same state
  if (article1.metadata.location.state === article2.metadata.location.state) score += 0.2;
  
  return score;
}

function generateArticleUrl(article: GeneratedArticle): string {
  const { location, topic, year } = article.metadata;
  const slug = `${location.state.toLowerCase()}/${location.city.toLowerCase()}/${topic.toLowerCase()}-${year}`;
  return `/${slug}`;
}