interface ContentAnalysis {
  isLocationSpecific: boolean;
  locationType: 'city' | 'state' | 'country' | 'region' | 'none';
  needsUniqueContent: boolean;
  variationType: 'unique' | 'template' | 'hybrid';
  reason: string;
}

// Article types that ALWAYS need unique location-specific content
const UNIQUE_LOCATION_TYPES = new Set([
  'coffee_shops',
  'restaurants',
  'bars',
  'gyms',
  'hotels',
  'activities',
  'attractions',
  'real_estate',
  'schools',
  'doctors',
  'services'
]);

// Article types that can use templated location content with specific details
const TEMPLATE_LOCATION_TYPES = new Set([
  'weather',
  'demographics',
  'cost_of_living',
  'transportation',
  'history',
  'culture'
]);

// Keywords that suggest location-specific content is needed
const LOCATION_KEYWORDS = {
  place: ['in', 'near', 'around', 'within', 'closest', 'nearby'],
  ranking: ['best', 'top', 'popular', 'rated', 'recommended'],
  local: ['local', 'neighborhood', 'area', 'district', 'community'],
  action: ['visit', 'find', 'explore', 'discover', 'experience'],
  time: ['today', 'tonight', 'weekend', 'current', 'upcoming']
};

// Content that suggests unique details are needed
const UNIQUE_CONTENT_INDICATORS = [
  'address',
  'location',
  'directions',
  'phone',
  'hours',
  'prices',
  'menu',
  'schedule',
  'availability'
];

export function analyzeContent(
  headline: string,
  articleType: string,
  content?: string
): ContentAnalysis {
  const lowercaseHeadline = headline.toLowerCase();
  const lowercaseContent = content?.toLowerCase() || '';

  // 1. Check if article type always needs unique location content
  if (UNIQUE_LOCATION_TYPES.has(articleType)) {
    return {
      isLocationSpecific: true,
      locationType: 'city',
      needsUniqueContent: true,
      variationType: 'unique',
      reason: `Article type '${articleType}' always requires unique location-specific content`
    };
  }

  // 2. Check if article type can use templated location content
  if (TEMPLATE_LOCATION_TYPES.has(articleType)) {
    return {
      isLocationSpecific: true,
      locationType: 'city',
      needsUniqueContent: false,
      variationType: 'template',
      reason: `Article type '${articleType}' can use templated location content with specific details`
    };
  }

  // 3. Check for location keywords in headline
  const hasLocationKeywords = Object.values(LOCATION_KEYWORDS).some(
    keywords => keywords.some(keyword => lowercaseHeadline.includes(keyword))
  );

  if (hasLocationKeywords) {
    // Determine if content needs to be unique based on indicators
    const needsUniqueContent = UNIQUE_CONTENT_INDICATORS.some(
      indicator => lowercaseHeadline.includes(indicator) || lowercaseContent?.includes(indicator)
    );

    return {
      isLocationSpecific: true,
      locationType: 'city', // Default to city, can be enhanced with location type detection
      needsUniqueContent,
      variationType: needsUniqueContent ? 'unique' : 'hybrid',
      reason: `Headline contains location-specific keywords and ${
        needsUniqueContent ? 'requires unique content' : 'can use hybrid approach'
      }`
    };
  }

  // 4. Check content for location indicators if provided
  if (content && UNIQUE_CONTENT_INDICATORS.some(indicator => lowercaseContent.includes(indicator))) {
    return {
      isLocationSpecific: true,
      locationType: 'city',
      needsUniqueContent: true,
      variationType: 'unique',
      reason: 'Content contains indicators requiring location-specific details'
    };
  }

  // Default: Not location-specific
  return {
    isLocationSpecific: false,
    locationType: 'none',
    needsUniqueContent: false,
    variationType: 'template',
    reason: 'No location-specific requirements detected'
  };
}

export function getLocationRequirements(analysis: ContentAnalysis) {
  if (!analysis.isLocationSpecific) {
    return null;
  }

  const requirements = {
    unique: {
      requiredFields: ['city', 'state', 'population'],
      optionalFields: ['region', 'landmarks', 'demographics'],
      contentStrategy: 'Generate unique content for each location',
      apiCallsNeeded: 'One per location'
    },
    template: {
      requiredFields: ['city', 'state'],
      optionalFields: ['population'],
      contentStrategy: 'Use template with location data insertion',
      apiCallsNeeded: 'One for base template'
    },
    hybrid: {
      requiredFields: ['city', 'state', 'population'],
      optionalFields: ['region'],
      contentStrategy: 'Generate base template with unique sections per location',
      apiCallsNeeded: 'One for template plus lightweight calls for unique sections'
    }
  };

  return requirements[analysis.variationType];
}

// Example usage:
/*
const headline = "Best Coffee Shops in [City]";
const articleType = "coffee_shops";

const analysis = analyzeContent(headline, articleType);
console.log(analysis);
// {
//   isLocationSpecific: true,
//   locationType: 'city',
//   needsUniqueContent: true,
//   variationType: 'unique',
//   reason: "Article type 'coffee_shops' always requires unique location-specific content"
// }

const requirements = getLocationRequirements(analysis);
console.log(requirements);
// {
//   requiredFields: ['city', 'state', 'population'],
//   optionalFields: ['region', 'landmarks', 'demographics'],
//   contentStrategy: 'Generate unique content for each location',
//   apiCallsNeeded: 'One per location'
// }
*/
