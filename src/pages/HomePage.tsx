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
      console.log('Fetching news with params:', {
        category,
        page: currentPage,
        searchQuery
      });
      
      const response = await getNews(category, currentPage, searchQuery);
      console.log("📡 Articles reçus :", response.articles);
      if (response.status === 'ok' && Array.isArray(response.articles)) {
        console.log(`Received ${response.articles.length} articles`);
        setArticles(response.articles);
        setTotalPages(Math.ceil(response.totalResults / 12));
      } else {
        console.error('Invalid API response:', response);
        setError('Format de réponse invalide');
        setArticles([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
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
      <div className="text-center mt-8">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg inline-block">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchNews}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
      />
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {articles.length === 0 ? (
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">Aucun article trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length === 0 ? (
              <p className="text-center text-gray-500">Aucun article trouvé.</p>
            ) : (
              articles.map((article, index) => {
                console.log("📌 Affichage de l'article :", article);
                return <NewsCard key={`${article.url}-${index}`} article={article} />;
              })
            )}
          </div>
            
          )}
          
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

export default HomePage