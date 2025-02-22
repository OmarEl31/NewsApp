import React from 'react';
import { Article } from '../types/news';
import { ExternalLink } from 'lucide-react';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="aspect-video overflow-hidden">
        <img
          src={article.urlToImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
          alt={article.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {article.source.name}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2">
          {article.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.description}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Lire plus
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
};

export default NewsCard;