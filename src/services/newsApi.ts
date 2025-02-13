import axios, { AxiosError } from 'axios';
import { NewsResponse, Category } from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const getNews = async (
  category: Category = 'general',
  page: number = 1,
  query?: string
): Promise<NewsResponse> => {
  const endpoint = query ? '/everything' : '/top-headlines';
  const params = query
    ? {
        q: query,
        page, 
        pageSize: 12,
        apiKey: API_KEY,
        language: 'fr', 
      }
    : {
        country: 'us', 
        category,
        page,
        pageSize: 12,
        apiKey: API_KEY,
      };

      console.log("📡 URL API :", `${BASE_URL}${endpoint}?${new URLSearchParams(Object.entries(params).map(([key, val]) => [key, String(val)]))}`);
  
  try {
    const response = await axios.get<NewsResponse>(`${BASE_URL}${endpoint}`, { params });
    console.log("🔄 Réponse API :", response.data);
    
    if (!response.data.articles || response.data.articles.length === 0) {
      console.warn("⚠️ Aucun article trouvé !");
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("❌ Erreur API :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des actualités');
    }
    throw new Error('Une erreur inattendue est survenue');
  }};