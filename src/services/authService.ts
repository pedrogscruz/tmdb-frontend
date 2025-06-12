import axios from 'axios';
import type { 
  RequestTokenResponse, 
  SessionResponse, 
  AccountResponse,
  AccountStatesResponse,
  FavoriteRequest,
  FavoriteResponse
} from '../types/tmdb';
import { tmdbConfig } from '../utils/config';

const api = axios.create({
  baseURL: tmdbConfig.baseUrl,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${tmdbConfig.apiToken}`,
  },
});

export const authService = {
  // Step 2: Create a request token
  createRequestToken: async (): Promise<RequestTokenResponse> => {
    const response = await api.get<RequestTokenResponse>('/authentication/token/new');
    return response.data;
  },

  // Step 3: Get approval URL
  getApprovalUrl: (requestToken: string): string => {
    return `https://www.themoviedb.org/authenticate/${requestToken}`;
  },

  // Step 4: Create session ID
  createSession: async (requestToken: string): Promise<SessionResponse> => {
    const response = await api.post<SessionResponse>('/authentication/session/new', {
      request_token: requestToken,
    });
    return response.data;
  },

  // Step 5: Get account details
  getAccountDetails: async (sessionId: string): Promise<AccountResponse> => {
    const response = await api.get<AccountResponse>('/account', {
      params: { session_id: sessionId },
    });
    return response.data;
  },

  // Get movie account states (favorite, watchlist, rated)
  getMovieAccountStates: async (movieId: number, sessionId: string): Promise<AccountStatesResponse> => {
    const response = await api.get<AccountStatesResponse>(`/movie/${movieId}/account_states`, {
      params: { session_id: sessionId },
    });
    return response.data;
  },

  // Step 6: Mark movie as favorite
  markAsFavorite: async (
    accountId: number,
    sessionId: string,
    movieId: number,
    favorite: boolean
  ): Promise<FavoriteResponse> => {
    const favoriteRequest: FavoriteRequest = {
      media_type: 'movie',
      media_id: movieId,
      favorite,
    };

    const response = await api.post<FavoriteResponse>(
      `/account/${accountId}/favorite`,
      favoriteRequest,
      {
        params: { session_id: sessionId },
      }
    );
    return response.data;
  },
};

// Local storage helpers
export const sessionStorage = {
  getSessionId: (): string | null => {
    return localStorage.getItem('tmdb_session_id');
  },

  setSessionId: (sessionId: string): void => {
    localStorage.setItem('tmdb_session_id', sessionId);
  },

  getAccountId: (): number | null => {
    const accountId = localStorage.getItem('tmdb_account_id');
    return accountId ? parseInt(accountId, 10) : null;
  },

  setAccountId: (accountId: number): void => {
    localStorage.setItem('tmdb_account_id', accountId.toString());
  },

  getUsername: (): string | null => {
    return localStorage.getItem('tmdb_username');
  },

  setUsername: (username: string): void => {
    localStorage.setItem('tmdb_username', username);
  },

  clearSession: (): void => {
    localStorage.removeItem('tmdb_session_id');
    localStorage.removeItem('tmdb_account_id');
    localStorage.removeItem('tmdb_username');
  },

  hasValidSession: (): boolean => {
    return Boolean(sessionStorage.getSessionId() && sessionStorage.getAccountId());
  },
}; 