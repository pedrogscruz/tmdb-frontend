import './MovieCardSkeleton.css';

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card-skeleton">
      <div className="movie-card-skeleton__image-container">
        <div className="movie-card-skeleton__image"></div>
      </div>
      <div className="movie-card-skeleton__info">
        <div className="movie-card-skeleton__title"></div>
        <div className="movie-card-skeleton__year"></div>
      </div>
    </div>
  );
}; 