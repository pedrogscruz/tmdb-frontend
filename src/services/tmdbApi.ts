import axios from 'axios';
import type { PopularMoviesResponse } from '../types/tmdb';
import { tmdbConfig } from '../utils/config';

const api = axios.create({
  baseURL: tmdbConfig.baseUrl,
  params: {
    api_key: tmdbConfig.apiKey,
  },
});

export type MovieCategory = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

export const tmdbApi = {
  getMoviesByCategory: async (category: MovieCategory, page: number = 1): Promise<PopularMoviesResponse> => {
    const response = await api.get<PopularMoviesResponse>(`/movie/${category}`, {
      params: { page },
    });
    return response.data;
  }
}; 