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

export interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TMDbConfig {
  apiKey: string;
  apiToken: string;
  baseUrl: string;
  imageBaseUrl: string;
}
