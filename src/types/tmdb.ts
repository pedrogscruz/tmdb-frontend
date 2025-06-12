export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  popularity: number;
  adult: boolean;
  video: boolean;
  genre_ids: number[];
  original_language: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Authentication interfaces
export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface SessionResponse {
  success: boolean;
  session_id: string;
}

export interface AccountResponse {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface AccountStatesResponse {
  id: number;
  favorite: boolean;
  rated: boolean | { value: number };
  watchlist: boolean;
}

export interface FavoriteRequest {
  media_type: 'movie';
  media_id: number;
  favorite: boolean;
}

export interface FavoriteResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface TMDbConfig {
  apiKey: string;
  apiToken: string;
  baseUrl: string;
  imageBaseUrl: string;
} 