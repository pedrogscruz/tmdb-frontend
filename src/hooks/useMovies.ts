import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from '../services/tmdbApi';

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: () => tmdbApi.getPopularMovies(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
