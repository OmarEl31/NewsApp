import React, { useState, useEffect } from 'react';
import { getNews } from '../services/newsApi';
import { Article, Category } from '../types/news';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { Loader2 } from 'lucide-react';

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
      if (response.status === 'ok' && Array.isArray(response.articles)) {
        setArticles(response.articles);
        setTotalPages(Math.ceil(response.totalResults / 12));
      } else {
        setError('Format de réponse invalide');
        setArticles([]);
        setTotalPages(1);
      }
    } catch (err) {
      setArticles([]);
      setTotalPages(1);
      setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des actualités');
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-3xl shadow-lg text-center max-w-lg">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={fetchNews}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Contenu principal */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {articles.length === 0 ? (
            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">Aucun article trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {articles.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
