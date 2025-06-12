import axios from 'axios';
import type { PopularMoviesResponse } from '../types/tmdb';
import { tmdbConfig } from '../utils/config';

const api = axios.create({
  baseURL: tmdbConfig.baseUrl,
  params: {
    api_key: tmdbConfig.apiKey,
  },
});

export const tmdbApi = {
  getPopularMovies: async (): Promise<PopularMoviesResponse> => {
    const response = await api.get<PopularMoviesResponse>('/movie/popular');
    return response.data;
  },
}; 