import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInfiniteMoviesByCategory } from '../hooks/useMovies';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { MovieCard } from '../components/MovieCard';
import { MoviesGridSkeleton } from '../components/MoviesGridSkeleton';
import { ErrorMessage } from '../components/ErrorMessage';
import { CategoryFilter } from '../components/CategoryFilter';
import { MobileHeader } from '../components/MobileHeader';
import { DesktopHeader } from '../components/DesktopHeader';
import { InfiniteScrollLoader } from '../components/InfiniteScrollLoader';
import type { MovieCategory } from '../services/tmdbApi';
import './HomePage.css';

export const HomePage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<MovieCategory>('popular');
  
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMoviesByCategory(selectedCategory);

  // Infinite scroll hook
  useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleCategoryChange = (category: MovieCategory) => {
    setSelectedCategory(category);
  };

  // Show skeleton loading for initial load
  if (isLoading && !data) {
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
        <MoviesGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={t('home.errorLoadingMovies')}
        onRetry={() => refetch()}
      />
    );
  }

  // Flatten all pages into a single array of movies
  const allMovies = data?.pages.flatMap(page => page.results) || [];

  return (
    <div className="home-page">
      {/* Mobile Header */}
      <MobileHeader 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Desktop Header */}
      <DesktopHeader selectedCategory={selectedCategory} />

      {/* Desktop Category Filter */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="home-page__content">
        <div className="movies-grid">
          {allMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {/* Infinite scroll loader */}
        <InfiniteScrollLoader 
          isLoading={isFetchingNextPage}
          hasNextPage={Boolean(hasNextPage)}
        />
      </main>
    </div>
  );
}; 