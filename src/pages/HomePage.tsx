import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MovieCard } from '../components/MovieCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { CategoryFilter } from '../components/CategoryFilter';
import { MobileHeader } from '../components/MobileHeader';
import { DesktopHeader } from '../components/DesktopHeader';
import { useMoviesByCategory } from '../hooks/useMovies';
import type { MovieCategory } from '../services/tmdbApi';
import './HomePage.css';

export const HomePage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<MovieCategory>('popular');
  const { data, refetch, isLoading, error } = useMoviesByCategory(selectedCategory);

  const handleCategoryChange = (category: MovieCategory) => {
    setSelectedCategory(category);
  };

  // Show skeleton loading for initial load
  if (isLoading && !data) {
    return 'loading...';
  }

  if (error) {
    return (
      <ErrorMessage
        message={t('home.errorLoadingMovies')}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="home-page">
      <MobileHeader 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <DesktopHeader selectedCategory={selectedCategory} />

      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

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