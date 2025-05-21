import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Type definitions
type ArticlePosition = 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft';

interface IncomingArticle {
  article: number;
  headline: string;
  text: string;
}

interface Article {
  position: ArticlePosition;
  headline: string;
  text: string;
  timestamp: string;
}

// Map article numbers to positions
const positionMap: Record<number, ArticlePosition> = {
  1: 'topRight',
  2: 'bottomRight',
  3: 'topLeft',
  4: 'bottomLeft',
};

export default async function handler(req: Request) {
  try {
    if (req.method === 'POST') {
      const articles = await req.json() as IncomingArticle[];

      // Validate input
      if (!Array.isArray(articles) || articles.length !== 4) {
        return new Response(JSON.stringify({ error: 'Exactly 4 articles required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Format timestamp
      const timestamp = format(new Date(), 'dd-MM-yyyy hh:mm a');

      // Delete existing articles
      await supabase.from('news_articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      // Prepare new articles
      const formattedArticles = articles.map((article) => ({
        position: positionMap[article.article],
        headline: article.headline,
        text: article.text,
        timestamp,
      }));

      // Insert new articles
      const { error: insertError } = await supabase
        .from('news_articles')
        .insert(formattedArticles);

      if (insertError) {
        throw insertError;
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } else if (req.method === 'GET') {
      // Fetch articles
      const { data: articles, error: fetchError } = await supabase
        .from('news_articles')
        .select('position, headline, text, timestamp');

      if (fetchError) {
        throw fetchError;
      }

      // Format response
      const response = articles.reduce((acc, article) => {
        acc[article.position] = {
          headline: article.headline,
          text: article.text,
          timestamp: article.timestamp,
        };
        return acc;
      }, {} as Record<ArticlePosition, Omit<Article, 'position'>>);

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}