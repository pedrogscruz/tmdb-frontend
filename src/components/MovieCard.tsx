import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/config';
import type { Movie } from '../types/tmdb';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card" data-testid="movie-card">
      <div className="movie-card__image-container">
        <img
          src={getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          className="movie-card__image"
          loading="lazy"
          data-testid="movie-image"
        />
        <div className="movie-card__overlay">
          <div className="movie-card__rating" data-testid="movie-rating">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title" data-testid="movie-title">{movie.title}</h3>
        <p className="movie-card__year" data-testid="movie-year">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </Link>
  );
};
