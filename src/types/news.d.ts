export interface NewsArticle {
  id: string;
  subject: string;
  mood: string;
  introduction: string;
  developments: string;
  implications: string;
  timestamp: string;
  type?: string;
}

export interface NewsSet {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  num_articles: number;
  news_type: string;
  mood: string;
  created_at: string;
  updated_at?: string;
}

export interface Sequence {
  id: string;
  user_id: string;
  name: string;
  frequency: 'weekly' | 'monthly';
  days: number[] | string[]; // Numbers 1-31 for monthly, day names for weekly
  sets: string[]; // Array of news_set IDs
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleSettings {
  style: 'professional' | 'funny' | 'serious' | 'casual' | 'dramatic';
  length: 'short' | 'medium' | 'long';
  customInstructions: string;
  language: 'english' | 'dutch' | 'german' | 'french' | 'spanish' | 'russian';
}