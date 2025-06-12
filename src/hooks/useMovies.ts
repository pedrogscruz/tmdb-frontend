import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { tmdbApi, type MovieCategory } from '../services/tmdbApi';

export const useMoviesByCategory = (category: MovieCategory, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => tmdbApi.getMoviesByCategory(category, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useInfiniteMoviesByCategory = (category: MovieCategory) => {
  return useInfiniteQuery({
    queryKey: ['infiniteMovies', category],
    queryFn: ({ pageParam = 1 }) => tmdbApi.getMoviesByCategory(category, pageParam),
    getNextPageParam: (lastPage) => {
      // Check if there are more pages available
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined; // No more pages
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialPageParam: 1,
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

export const useMovieVideos = (id: number) => {
  return useQuery({
    queryKey: ['movieVideos', id],
    queryFn: () => tmdbApi.getMovieVideos(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}; 