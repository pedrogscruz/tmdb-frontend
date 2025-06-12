export const tmdbConfig = {
  apiKey: 'test-api-key',
  apiToken: 'test-api-token',
  baseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p'
};

export const getImageUrl = (path: string | null, size: string = 'w185'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${tmdbConfig.imageBaseUrl}/${size}${path}`;
}; 