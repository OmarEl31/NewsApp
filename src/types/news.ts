export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type Category = 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';