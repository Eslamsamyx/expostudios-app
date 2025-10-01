export interface ArticleAuthor {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
  bio: string | null;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt: Date | null;
  featuredAt: Date | null;
  author: ArticleAuthor;
  views: number;
  shares: number;
  category: string | null;
  tags: string[];
  allowComments: boolean;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  readingTime?: number; // calculated field
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
  categories: string[];
  tags: string[];
}

export interface ArticleFilters {
  category: string | 'all';
  tag: string | 'all';
  search: string;
  featured: boolean;
  page: number;
}

export interface ArticleDetailResponse {
  article: Article;
  relatedArticles: Article[];
}
