import type { TMDbConfig } from '../types/tmdb';

// API Key should be set as environment variable
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE';
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN || 'YOUR_API_TOKEN_HERE';

export const tmdbConfig: TMDbConfig = {
  apiKey: API_KEY,
  apiToken: API_TOKEN,
  baseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p'
};

export const getImageUrl = (path: string | null, size: string = 'w185'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${tmdbConfig.imageBaseUrl}/${size}${path}`;
}; 