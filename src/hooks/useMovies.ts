import { useQuery } from '@tanstack/react-query';
import { tmdbApi, type MovieCategory } from '../services/tmdbApi';

export const useMoviesByCategory = (category: MovieCategory, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => tmdbApi.getMoviesByCategory(category, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
