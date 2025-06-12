import { MovieCardSkeleton } from './MovieCardSkeleton';
import './MoviesGridSkeleton.css';

interface MoviesGridSkeletonProps {
  count?: number;
}

export const MoviesGridSkeleton = ({ count = 20 }: MoviesGridSkeletonProps) => {
  return (
    <div className="movies-grid-skeleton">
      {Array.from({ length: count }, (_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}; 