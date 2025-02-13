import React from 'react';
import { Article } from '../types/news';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  console.log("📰 Article reçu :", article);

  if (!article) {
    return <p className="text-red-500">⚠️ Erreur : Aucun article reçu.</p>;
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={article.urlToImage || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{article.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{article.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read more
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
