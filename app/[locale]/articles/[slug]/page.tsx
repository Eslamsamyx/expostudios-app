import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticleDetail from '@/components/articles/ArticleDetail';
import RelatedArticles from '@/components/articles/RelatedArticles';
import { Article } from '@/lib/types/articles';

interface ArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getArticle(slug: string): Promise<{
  article: Article;
  relatedArticles: Article[];
} | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/articles/${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticle(slug);

  if (!data) {
    return {
      title: 'Article Not Found',
    };
  }

  const { article } = data;

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt || undefined,
    keywords: article.keywords,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt || undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
      type: 'article',
      publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
      authors: article.author.name ? [article.author.name] : undefined,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt || undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const data = await getArticle(slug);

  if (!data) {
    notFound();
  }

  const { article, relatedArticles } = data;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Article Detail - slate-950 to purple-950 */}
      <div className="bg-gradient-to-b from-slate-950 to-purple-950 pt-20">
        <ArticleDetail article={article} />
      </div>

      {/* Related Articles - purple-950 to indigo-950 */}
      <div className="bg-gradient-to-b from-purple-950 to-indigo-950">
        <RelatedArticles articles={relatedArticles} />
      </div>

      <Footer />
    </div>
  );
}
