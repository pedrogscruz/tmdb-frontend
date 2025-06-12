import { useQuery } from '@tanstack/react-query';
import { tmdbApi, type MovieCategory } from '../services/tmdbApi';

export const useMoviesByCategory = (category: MovieCategory, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => tmdbApi.getMoviesByCategory(category, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => tmdbApi.getMovieDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
