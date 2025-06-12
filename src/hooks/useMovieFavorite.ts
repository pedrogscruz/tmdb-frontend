import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, sessionStorage } from '../services/authService';
import type { AccountStatesResponse } from '../types/tmdb';

export const useMovieFavorite = (movieId: number) => {
  const queryClient = useQueryClient();
  const sessionId = sessionStorage.getSessionId();
  const accountId = sessionStorage.getAccountId();

  // Query to get movie account states (including favorite status)
  const {
    data: accountStates,
    isLoading: isLoadingStates,
    error: statesError,
  } = useQuery<AccountStatesResponse>({
    queryKey: ['movieAccountStates', movieId, sessionId],
    queryFn: () => authService.getMovieAccountStates(movieId, sessionId!),
    enabled: Boolean(sessionId && movieId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation to toggle favorite status
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (favorite: boolean) => {
      if (!accountId || !sessionId) {
        throw new Error('User not authenticated');
      }
      return authService.markAsFavorite(accountId, sessionId, movieId, favorite);
    },
    onSuccess: (_data, favorite) => {
      // Invalidate and refetch the account states
      queryClient.setQueryData(['movieAccountStates', movieId, sessionId], (oldData: AccountStatesResponse) => {
        return {
          ...oldData,
          favorite: favorite,
        };
      });
      queryClient.invalidateQueries({
        queryKey: ['movieAccountStates', movieId, sessionId],
      });
    },
    onError: (error) => {
      console.error('Error toggling favorite:', error);
    },
  });

  const isFavorite = accountStates?.favorite ?? false;
  const isAuthenticated = Boolean(sessionId && accountId);

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      console.warn('User must be authenticated to toggle favorite');
      return;
    }
    toggleFavoriteMutation.mutate(!isFavorite);
  };

  return {
    isFavorite,
    isLoadingStates,
    isTogglingFavorite: toggleFavoriteMutation.isPending,
    statesError,
    toggleError: toggleFavoriteMutation.error,
    toggleFavorite,
    isAuthenticated,
  };
}; 