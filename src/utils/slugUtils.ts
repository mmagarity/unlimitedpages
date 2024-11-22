export function generateSlug(components: {
  location?: string;
  keyword: string;
  demographic?: string;
  year?: string;
}): string {
  const { location, keyword, demographic, year } = components;
  
  const slugParts = [];
  
  // Add location if present
  if (location) {
    slugParts.push(slugify(location));
  }
  
  // Add main keyword
  slugParts.push(slugify(keyword));
  
  // Add demographic if present
  if (demographic) {
    slugParts.push(`for-${slugify(demographic)}`);
  }
  
  // Add year if present
  if (year) {
    slugParts.push(year.toString());
  }
  
  return slugParts.join('-');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateUniqueId(components: {
  location?: string;
  keyword: string;
  type: string;
}): string {
  const { location, keyword, type } = components;
  
  const idParts = [
    type,
    slugify(keyword),
    location ? slugify(location) : 'global'
  ];
  
  return idParts.join('-');
}