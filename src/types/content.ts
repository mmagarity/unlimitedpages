export interface ContentRequest {
  headline: string;
  location: {
    city: string;
    state: string;
    stateFullName: string;
    population?: number;
  };
  topic: string;
  demographic?: string;
  year: string;
}

export interface GeneratedArticle {
  metadata: {
    generatedAt: string;
    location: {
      city: string;
      state: string;
      stateFullName: string;
      population?: number;
    };
    topic: string;
    demographic?: string;
    year: string;
  };
  content: {
    title: string;
    introduction: string;
    mainContent: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
    expertTips: string[];
    localInsights: string[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeywords: string[];
    headings: {
      level: number;
      text: string;
    }[];
  };
  images: {
    url: string;
    alt: string;
    caption: string;
  }[];
  internalLinks: InternalLink[];
  publishingSchedule: {
    publishAt: string;
    timeSlot: string;
  } | null;
}

export interface InternalLink {
  title: string;
  url: string;
  type: 'same-city' | 'nearby-city';
  relevanceScore: number;
}

export interface PublishingSlot {
  hour: number;
  minute: number;
  maxArticles: number;
}

export interface WebflowCollection {
  id: string;
  name: string;
  fields: {
    id: string;
    name: string;
    type: string;
    required: boolean;
  }[];
}