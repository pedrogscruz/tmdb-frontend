import './MovieDetailsSkeleton.css';

export const MovieDetailsSkeleton = () => {
  return (
    <div className="movie-details-skeleton">
      {/* Mobile Header Skeleton */}
      <div className="movie-details-skeleton__header-mobile">
        <div className="movie-details-skeleton__back-btn"></div>
        <div className="movie-details-skeleton__menu-btn"></div>
      </div>

      {/* Desktop Header Skeleton */}
      <div className="movie-details-skeleton__header-desktop">
        <div className="movie-details-skeleton__user-menu"></div>
      </div>

      <div className="movie-details-skeleton__container">
        {/* Title Section Skeleton */}
        <div className="movie-details-skeleton__title-section">
          <div className="movie-details-skeleton__title"></div>
        </div>

        <div className="movie-details-skeleton__content-container">
          <div className="movie-details-skeleton__content">
            {/* Poster Skeleton */}
            <div className="movie-details-skeleton__poster-container">
              <div className="movie-details-skeleton__poster"></div>
            </div>
            
            {/* Info Panel Skeleton */}
            <div className="movie-details-skeleton__info-panel">
              <div className="movie-details-skeleton__meta-info">
                <div className="movie-details-skeleton__year"></div>
                <div className="movie-details-skeleton__duration"></div>
              </div>
              <div className="movie-details-skeleton__actions">
                <div className="movie-details-skeleton__rating"></div>
                <div className="movie-details-skeleton__favorite-btn"></div>
              </div>
            </div>
          </div>

          {/* Overview Section Skeleton */}
          <div className="movie-details-skeleton__overview-section">
            <div className="movie-details-skeleton__overview-line"></div>
            <div className="movie-details-skeleton__overview-line"></div>
            <div className="movie-details-skeleton__overview-line movie-details-skeleton__overview-line--short"></div>
          </div>

          {/* Trailers Section Skeleton */}
          <div className="movie-details-skeleton__trailers-section">
            <div className="movie-details-skeleton__trailers-title"></div>
            <div className="movie-details-skeleton__trailer-buttons">
              <div className="movie-details-skeleton__trailer-btn"></div>
              <div className="movie-details-skeleton__trailer-btn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 