
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMovieDetails } from '../hooks/useMovies';
import { ErrorMessage } from '../components/ErrorMessage';
import { getImageUrl } from '../utils/config';
import './MovieDetailsPage.css';

export const MovieDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  
  const { data: movie, isLoading: movieLoading, error: movieError, refetch: refetchMovie } = useMovieDetails(movieId);

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
          </div>
        </div>
      </div>
    </div>
  );
}; 