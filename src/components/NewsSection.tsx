import { useNewsArticles } from '../hooks/useNewsArticles';
import { ChevronRight } from 'lucide-react';

export function NewsSection() {
  const { articles, loading, error } = useNewsArticles();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 animate-pulse">
          <div className="h-8 w-64 bg-gray-800 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-800/50 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative p-6 rounded-2xl bg-gray-900/50 animate-pulse">
              <div className="space-y-3">
                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800/50 rounded w-full"></div>
                <div className="h-4 bg-gray-800/50 rounded w-2/3"></div>
                <div className="h-3 bg-gray-800/30 rounded w-24 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12 bg-red-500/10 rounded-2xl border border-red-500/20">
          <p className="text-red-400">Error loading articles: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!articles) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-gray-400">No articles available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-b from-[#17255A] to-[#1a1a2e]">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.03),transparent_70%)] animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest AI News</h2>
          <p className="text-xl text-gray-400">Stay updated with the latest developments in AI technology</p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Left */}
          <ArticleCard article={articles.topLeft} />
          
          {/* Top Right */}
          <ArticleCard article={articles.topRight} />
          
          {/* Bottom Left */}
          <ArticleCard article={articles.bottomLeft} />
          
          {/* Bottom Right */}
          <ArticleCard article={articles.bottomRight} />
        </div>
      </div>
    </div>
  );
}

interface ArticleCardProps {
  article: {
    headline: string;
    text: string;
    timestamp: string;
  };
}

function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const previewText = article.text.length > 200 
    ? `${article.text.slice(0, 200)}...` 
    : article.text;

  return (
    <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 transition-all duration-300 backdrop-blur-sm overflow-hidden hover:scale-[1.02]">
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl border border-purple-500/0 group-hover:border-purple-500/50 transition-colors duration-300" />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.7)] transition-shadow duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
          {article.headline}
        </h3>
        <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
          {previewText}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
            {formattedDate}
          </span>
          <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-200">
            Read More
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}