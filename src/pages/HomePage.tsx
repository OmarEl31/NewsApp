import React, { useState, useEffect } from 'react';
import { getNews } from '../services/newsApi';
import { Article, Category } from '../types/news';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNews(category, currentPage, searchQuery);
      
      console.log("📰 Articles reçus :", response.articles);
      
      if (response.articles.length === 0) {
        console.warn("⚠️ Aucun article récupéré depuis l'API !");
      }
      
      setArticles(response.articles);
      setTotalPages(Math.ceil(response.totalResults / 12));
    } catch (err) {
      setArticles([]);
      setTotalPages(1);
      setError(err instanceof Error ? err.message : "Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setCurrentPage(1);
    setSearchQuery('');
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter selectedCategory={category} onCategoryChange={handleCategoryChange} />
      
      {error && (
        <div className="text-center mt-8 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button onClick={fetchNews} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {articles.length === 0 ? (
            <p className="text-center text-gray-500">Aucun article trouvé.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          )}

          {articles.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
