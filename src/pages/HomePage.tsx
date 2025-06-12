import { MovieCard } from '../components/MovieCard';
import { MobileHeader } from '../components/MobileHeader';
import { usePopularMovies } from '../hooks/useMovies';
import './HomePage.css';

export const HomePage = () => {
  const { data, isLoading, error } = usePopularMovies();

  // Show skeleton loading for initial load
  if (isLoading && !data) {
    return 'loading...';
  }

  if (error) {
    return 'error';
  }


  return (
    <div className="home-page">
      {/* Mobile Header */}
      <MobileHeader />

      <main className="home-page__content">
        <div className="movies-grid">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}; 