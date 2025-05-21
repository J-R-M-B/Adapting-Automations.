import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

export function AnalyticsTracker() {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Check if table exists before inserting
        const { error: tableCheckError } = await supabase
          .from('analytics_events')
          .select('*', { count: 'exact', head: true })
          .limit(0);

        // If the table doesn't exist, log a warning but don't throw an error
        if (tableCheckError) {
          console.warn('Analytics tracking disabled: analytics_events table may not exist', tableCheckError);
          return;
        }

        const { error } = await supabase.from('analytics_events').insert([{
          user_id: user?.id || null,
          path: window.location.pathname,
          event_type: 'page_view',
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          screen_width: window.innerWidth,
          screen_height: window.innerHeight
        }]);

        if (error) {
          console.error('Error tracking page view:', error);
        }
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, [location.pathname, user]);

  return null; // This component doesn't render anything
}