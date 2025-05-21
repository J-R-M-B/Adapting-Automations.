import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type ArticlePosition = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';

export interface Article {
  headline: string;
  text: string;
  timestamp: string;
}

export type Articles = Record<ArticlePosition, Article>;

const positions: ArticlePosition[] = ['topLeft', 'bottomLeft', 'topRight', 'bottomRight'];

export function useNewsArticles() {
  const [articles, setArticles] = useState<Articles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  const fetchArticles = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('news_articles')
        .select('headline, text, timestamp')
        .order('timestamp', { ascending: false })
        .limit(4);

      if (fetchError) {
        throw fetchError;
      }

      if (!data || data.length === 0) {
        setArticles(null);
        return;
      }

      // Map the 4 newest articles to positions
      const formattedArticles = positions.reduce((acc, position, index) => {
        if (data[index]) {
          acc[position] = {
            headline: data[index].headline,
            text: data[index].text,
            timestamp: data[index].timestamp,
          };
        }
        return acc;
      }, {} as Articles);

      setArticles(formattedArticles);
      setError(null);
      setLastUpdateTime(new Date());
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchArticles();

    // Set up real-time subscription
    const subscription = supabase
      .channel('news_articles_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'news_articles' 
        }, 
        () => {
          fetchArticles();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { articles, loading, error, lastUpdateTime };
}