
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMovieDetails, useMovieVideos } from '../hooks/useMovies';
import { ErrorMessage } from '../components/ErrorMessage';
import { getImageUrl } from '../utils/config';
import type { Video } from '../types/tmdb';
import './MovieDetailsPage.css';

export const MovieDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  
  const { data: movie, isLoading: movieLoading, error: movieError, refetch: refetchMovie } = useMovieDetails(movieId);
  const { data: videosData, isLoading: videosLoading, error: videosError } = useMovieVideos(movieId);

  if (movieLoading) {
    return 'loading...';
  }

  if (movieError || !movie) {
    return (
      <ErrorMessage
        message={t('movieDetails.errorLoadingDetails')}
        onRetry={() => refetchMovie()}
      />
    );
  }

  const handlePlayTrailer = (video: Video) => {
    if (video.site === 'YouTube') {
      window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank');
    }
  };

  // Filter videos to get only trailers from YouTube
  const trailers = videosData?.results.filter(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  ).slice(0, 2) || []; // Limit to first 2 trailers

  return (
    <div className="movie-details">
      <header className="movie-details__header-mobile">
        <Link to="/" className="movie-details__back-btn">
          <span className="arrow-icon">{"← "}</span>{t('movieDetails.backButton')}
        </Link>
      </header>
      <header className="movie-details__header-desktop" />
      <div className="movie-details__container">
        <div className="movie-details__title-section">
          <h1 className="movie-details__main-title">{movie.title}</h1>
        </div>

        <div className="movie-details__content-container">
          <div className="movie-details__content">
            <div className="movie-details__poster-container">
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="movie-details__poster"
              />
            </div>
            
            <div className="movie-details__info-panel">
              <div className="movie-details__meta-info">
                <div className="movie-details__year">
                  {new Date(movie.release_date).getFullYear()}
                </div>
                <div className="movie-details__duration">
                  {movie.runtime} {t('movieDetails.mins')}
                </div>
              </div>
              <div className="movie-details__actions">
                <div className="movie-details__rating-badge">
                  {movie.vote_average.toFixed(1)}/10
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-details__overview-section">
            <p className="movie-details__overview">{movie.overview}</p>
          </div>

          <div className="movie-details__trailers-section">
            <h2 className="movie-details__trailers-title">{t('movieDetails.trailers')}</h2>
            
            {videosLoading ? (
              <div className="movie-details__trailers-loading">
                {t('movieDetails.loadingTrailers')}
              </div>
            ) : videosError ? (
              <div className="movie-details__trailers-error">
                {t('movieDetails.errorLoadingTrailers')}
              </div>
            ) : trailers.length > 0 ? (
              <div className="movie-details__trailer-buttons">
                {trailers.map((trailer, index) => (
                  <button 
                    key={trailer.id}
                    className="movie-details__trailer-btn"
                    onClick={() => handlePlayTrailer(trailer)}
                  >
                    <span className="movie-details__play-icon">▶</span>
                    {trailer.name || t('movieDetails.playTrailer', { number: index + 1 })}
                  </button>
                ))}
              </div>
            ) : (
              <div className="movie-details__no-trailers">
                {t('movieDetails.noTrailers')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 