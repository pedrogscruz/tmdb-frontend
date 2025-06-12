import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { MovieDetailsPage } from '../MovieDetailsPage';
import { tmdbApi } from '../../services/tmdbApi';
import { authService, sessionStorage } from '../../services/authService';
import { SessionContext } from '../../providers/Session';
import type { MovieDetails, VideosResponse, AccountStatesResponse } from '../../types/tmdb';

// Mock modules
jest.mock('../../services/tmdbApi');
jest.mock('../../services/authService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '870028' }),
}));

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { number?: number }) => {
      const translations: Record<string, string> = {
        'movieDetails.backButton': 'Back',
        'movieDetails.mins': 'mins',
        'movieDetails.addToFavorite': 'Add to Favorites',
        'movieDetails.removeFromFavorites': 'Remove from Favorites',
        'movieDetails.loginRequired': 'Login required to manage favorites',
        'movieDetails.errorAddingFavorite': 'Error adding to favorites',
        'movieDetails.trailers': 'Trailers',
        'movieDetails.loadingTrailers': 'Loading trailers...',
        'movieDetails.errorLoadingTrailers': 'Error loading trailers',
        'movieDetails.playTrailer': `Play Trailer ${options?.number || ''}`,
        'movieDetails.noTrailers': 'No trailers available',
        'common.logout': 'Logout',
        'common.login': 'Login',
        'movieDetails.errorLoadingDetails': 'Error loading movie details',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock data using the exact data provided by the user (matching MovieDetails type)
const mockMovieDetails: MovieDetails = {
  adult: false,
  backdrop_path: "/yBDvgpyynDsbMyK21FoQu1c2wYR.jpg",
  budget: 80000000,
  genres: [
    { id: 9648, name: "Mystery" },
    { id: 80, name: "Crime" },
    { id: 53, name: "Thriller" }
  ],
  homepage: "https://www.amazon.com/salp/theaccountant2?hhf",
  id: 870028,
  original_language: "en",
  original_title: "The Accountant²",
  overview: "When an old acquaintance is murdered, Wolff is compelled to solve the case. Realizing more extreme measures are necessary, Wolff recruits his estranged and highly lethal brother, Brax, to help. In partnership with Marybeth Medina, they uncover a deadly conspiracy, becoming targets of a ruthless network of killers who will stop at nothing to keep their secrets buried.",
  popularity: 653.8968,
  poster_path: "/kMDUS7VmFhb2coRfVBoGLR8ADBt.jpg",
  release_date: "2025-04-23",
  revenue: 101449750,
  runtime: 133,
  status: "Released",
  tagline: "Do you like puzzles?",
  title: "The Accountant²",
  video: false,
  vote_average: 7.217,
  vote_count: 641,
  genre_ids: [9648, 80, 53]
};

const mockVideosResponse: VideosResponse = {
  id: 870028,
  results: [
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Behind The Scenes: Christian & Braxton Team Up",
      key: "XlctyowtqAs",
      site: "YouTube",
      size: 1080,
      type: "Behind the Scenes",
      official: true,
      published_at: "2025-06-11T18:00:38.000Z",
      id: "684ab334bbfe31cc90293dce"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Christian and Brax Hostage Bus Fight",
      key: "p-sVwPishsA",
      site: "YouTube",
      size: 1080,
      type: "Clip",
      official: true,
      published_at: "2025-06-08T19:00:40.000Z",
      id: "684745644e83f7c09bde7355"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Christian and Marybeth Uncover a Money Laundering Scheme",
      key: "Z59nhxU1LZg",
      site: "YouTube",
      size: 1080,
      type: "Clip",
      official: true,
      published_at: "2025-06-06T19:00:35.000Z",
      id: "68433ec60c443e98a496c8c7"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Christian Provokes a Cowboy Standoff",
      key: "WI2-CwCoHgI",
      site: "YouTube",
      size: 1080,
      type: "Clip",
      official: true,
      published_at: "2025-06-05T18:00:34.000Z",
      id: "68423077e74ceb5d8bf2c8bf"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Opening Scene",
      key: "ZDPpr9wxvtE",
      site: "YouTube",
      size: 1080,
      type: "Clip",
      official: true,
      published_at: "2025-06-04T15:00:55.000Z",
      id: "6840ae7939ca7e01dead8c1e"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Official Clip",
      key: "ifkNHpDCNwA",
      site: "YouTube",
      size: 1080,
      type: "Clip",
      official: true,
      published_at: "2025-04-29T16:16:40.000Z",
      id: "681139a7eb1d4b06de0fef0a"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Official Clip",
      key: "l_NLcUPEWB8",
      site: "YouTube",
      size: 1080,
      type: "Clip",
      official: true,
      published_at: "2025-04-25T11:28:58.000Z",
      id: "680f05f0eb1d4b06de0f7c38"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Welcome Back Christian Wolff",
      key: "njJ5oAZGN3Q",
      site: "YouTube",
      size: 1080,
      type: "Featurette",
      official: true,
      published_at: "2025-04-22T16:01:17.000Z",
      id: "680a8747271ecb3ae08a2e15"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Final Trailer",
      key: "RwXDphhQ9Tg",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
      official: true,
      published_at: "2025-04-21T16:00:45.000Z",
      id: "6806c13237a722b8868a3563"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "First Look Featurette",
      key: "RGmAfDtVAyA",
      site: "YouTube",
      size: 1080,
      type: "Featurette",
      official: true,
      published_at: "2025-04-18T17:00:35.000Z",
      id: "6802ea0265c00a25a5d963b0"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Brothers Featurette",
      key: "uffTrourShA",
      site: "YouTube",
      size: 1080,
      type: "Featurette",
      official: true,
      published_at: "2025-04-16T16:01:27.000Z",
      id: "67ffd7aaef5ae687cbd9aca6"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Strong Women Featurette",
      key: "XwPC-4Ue9f4",
      site: "YouTube",
      size: 1080,
      type: "Featurette",
      official: true,
      published_at: "2025-04-14T16:00:02.000Z",
      id: "67fd53293015363286d94b0f"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Official Vertical Trailer 2",
      key: "eu1HJ73FQuY",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
      official: true,
      published_at: "2025-04-04T10:22:52.000Z",
      id: "67f2c3662f7d43702799e75c"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Official Trailer 2",
      key: "HPMh3AO4Gm0",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
      official: true,
      published_at: "2025-04-03T14:00:02.000Z",
      id: "67ee9c188689061e1fe1ad5b"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Ben and Jon Road Trip to SXSW",
      key: "ZHNDS7zPQNk",
      site: "YouTube",
      size: 1080,
      type: "Featurette",
      official: true,
      published_at: "2025-03-08T17:00:39.000Z",
      id: "67cf20ec6676e9940010f9c3"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Official Vertical Trailer",
      key: "ju-KSxVlysw",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
      official: true,
      published_at: "2025-02-17T17:41:36.000Z",
      id: "67b440f4c5fe1f0aefe0cc2b"
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Official Trailer",
      key: "3wRCOqyDI6E",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
      official: true,
      published_at: "2025-02-13T15:00:26.000Z",
      id: "67ae09218c5579ba6e36f52a"
    }
  ]
};

const mockAccountStates: AccountStatesResponse = {
  id: 870028,
  favorite: false,
  rated: false,
  watchlist: false
};

// Setup test wrapper
const TestWrapper: React.FC<{ children: React.ReactNode; isAuthenticated?: boolean }> = ({ 
  children, 
  isAuthenticated = false 
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const sessionContextValue = {
    isLoggedIn: isAuthenticated,
    setIsLoggedIn: jest.fn(),
    handleLoginClick: jest.fn(),
    handleLogoutClick: jest.fn(),
    username: isAuthenticated ? 'testuser' : null,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SessionContext.Provider value={sessionContextValue}>
          {children}
        </SessionContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('MovieDetailsPage E2E Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock API responses
    (tmdbApi.getMovieDetails as jest.Mock).mockResolvedValue(mockMovieDetails);
    (tmdbApi.getMovieVideos as jest.Mock).mockResolvedValue(mockVideosResponse);
    (authService.getMovieAccountStates as jest.Mock).mockResolvedValue(mockAccountStates);
    (authService.markAsFavorite as jest.Mock).mockResolvedValue({ success: true });
    
    // Mock session storage
    (sessionStorage.getSessionId as jest.Mock).mockReturnValue('test-session-id');
    (sessionStorage.getAccountId as jest.Mock).mockReturnValue(123);
  });

  describe('Movie Information Display', () => {
    it('should render all movie information elements with correct data-testid attributes and content', async () => {
      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      // Wait for data to load
      await waitFor(() => {
        expect(screen.getByTestId('movie-details-page')).toBeInTheDocument();
      });

      // Verify movie title
      const movieTitle = screen.getByTestId('movie-title');
      expect(movieTitle).toBeInTheDocument();
      expect(movieTitle).toHaveTextContent('The Accountant²');

      // Verify movie poster
      const moviePoster = screen.getByTestId('movie-poster');
      expect(moviePoster).toBeInTheDocument();
      expect(moviePoster).toHaveAttribute('alt', 'The Accountant²');
      expect(moviePoster).toHaveAttribute('src', expect.stringContaining('/kMDUS7VmFhb2coRfVBoGLR8ADBt.jpg'));

      // Verify movie year
      const movieYear = screen.getByTestId('movie-year');
      expect(movieYear).toBeInTheDocument();
      expect(movieYear).toHaveTextContent('2025');

      // Verify movie duration
      const movieDuration = screen.getByTestId('movie-duration');
      expect(movieDuration).toBeInTheDocument();
      expect(movieDuration).toHaveTextContent('133 mins');

      // Verify movie rating
      const movieRating = screen.getByTestId('movie-rating');
      expect(movieRating).toBeInTheDocument();
      expect(movieRating).toHaveTextContent('7.2/10');

      // Verify movie overview
      const movieOverview = screen.getByTestId('movie-overview');
      expect(movieOverview).toBeInTheDocument();
      expect(movieOverview).toHaveTextContent('When an old acquaintance is murdered, Wolff is compelled to solve the case');
    });

    it('should call the correct API endpoint for movie details', async () => {
      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(tmdbApi.getMovieDetails).toHaveBeenCalledWith(870028);
      });
    });
  });

  describe('Trailer Information Display', () => {
    it('should render trailer section with correct data-testid attributes', async () => {
      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('trailers-section')).toBeInTheDocument();
      });

      // Verify trailers title
      const trailersTitle = screen.getByTestId('trailers-title');
      expect(trailersTitle).toBeInTheDocument();
      expect(trailersTitle).toHaveTextContent('Trailers');

      // Verify trailer buttons container
      const trailerButtons = screen.getByTestId('trailer-buttons');
      expect(trailerButtons).toBeInTheDocument();
    });

    it('should render only YouTube trailers (filtered from all videos)', async () => {
      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('trailer-buttons')).toBeInTheDocument();
      });

      // Should only show first 2 trailers (type: "Trailer" and site: "YouTube")
      const trailerButton0 = screen.getByTestId('trailer-button-0');
      expect(trailerButton0).toBeInTheDocument();
      expect(trailerButton0).toHaveTextContent('Final Trailer');

      const trailerButton1 = screen.getByTestId('trailer-button-1');
      expect(trailerButton1).toBeInTheDocument();
      expect(trailerButton1).toHaveTextContent('Official Vertical Trailer 2');

      // Should not show more than 2 trailers (limited by slice(0, 2))
      expect(screen.queryByTestId('trailer-button-2')).not.toBeInTheDocument();
    });

    it('should open YouTube trailer when trailer button is clicked', async () => {
      const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('trailer-button-0')).toBeInTheDocument();
      });

      const trailerButton = screen.getByTestId('trailer-button-0');
      fireEvent.click(trailerButton);

      expect(windowOpenSpy).toHaveBeenCalledWith('https://www.youtube.com/watch?v=RwXDphhQ9Tg', '_blank');

      windowOpenSpy.mockRestore();
    });

    it('should call the correct API endpoint for movie videos', async () => {
      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(tmdbApi.getMovieVideos).toHaveBeenCalledWith(870028);
      });
    });

    it('should show no trailers message when no trailers are available', async () => {
      (tmdbApi.getMovieVideos as jest.Mock).mockResolvedValue({
        id: 870028,
        results: []
      });

      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('no-trailers')).toBeInTheDocument();
      });

      const noTrailersMessage = screen.getByTestId('no-trailers');
      expect(noTrailersMessage).toHaveTextContent('No trailers available');
    });

    it('should show loading state for trailers with correct data-testid', async () => {
      (tmdbApi.getMovieVideos as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(mockVideosResponse), 100))
      );

      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      // Initially should show loading
      await waitFor(() => {
        expect(screen.getByTestId('trailers-loading')).toBeInTheDocument();
      });

      const loadingMessage = screen.getByTestId('trailers-loading');
      expect(loadingMessage).toHaveTextContent('Loading trailers...');
    });

    it('should show error state for trailers with correct data-testid', async () => {
      (tmdbApi.getMovieVideos as jest.Mock).mockRejectedValue(new Error('API Error'));

      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('trailers-error')).toBeInTheDocument();
      });

      const errorMessage = screen.getByTestId('trailers-error');
      expect(errorMessage).toHaveTextContent('Error loading trailers');
    });
  });

  describe('Favorite Functionality', () => {
    it('should show login hint when user is not authenticated', async () => {
      (sessionStorage.getSessionId as jest.Mock).mockReturnValue(null);
      (sessionStorage.getAccountId as jest.Mock).mockReturnValue(null);

      render(
        <TestWrapper isAuthenticated={false}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('login-hint')).toBeInTheDocument();
      });

      const loginHint = screen.getByTestId('login-hint');
      expect(loginHint).toHaveTextContent('Login required to manage favorites');

      const favoriteButton = screen.getByTestId('favorite-button');
      expect(favoriteButton).toBeDisabled();
    });

    it('should show "Add to Favorites" when movie is not favorite', async () => {
      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
      });

      const favoriteButton = screen.getByTestId('favorite-button');
      expect(favoriteButton).toHaveTextContent('Add to Favorites');
      expect(favoriteButton).not.toHaveClass('movie-details__favorite-btn--active');
    });

    it('should show "Remove from Favorites" when movie is favorite', async () => {
      (authService.getMovieAccountStates as jest.Mock).mockResolvedValue({
        ...mockAccountStates,
        favorite: true
      });

      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
      });

      const favoriteButton = screen.getByTestId('favorite-button');
      expect(favoriteButton).toHaveTextContent('Remove from Favorites');
      expect(favoriteButton).toHaveClass('movie-details__favorite-btn--active');
    });

    it('should call add favorite endpoint with correct parameters', async () => {
      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
      });

      const favoriteButton = screen.getByTestId('favorite-button');
      fireEvent.click(favoriteButton);

      await waitFor(() => {
        expect(authService.markAsFavorite).toHaveBeenCalledWith(
          123, // accountId
          'test-session-id', // sessionId
          870028, // movieId
          true // favorite
        );
      });
    });

    it('should call remove favorite endpoint with correct parameters', async () => {
      (authService.getMovieAccountStates as jest.Mock).mockResolvedValue({
        ...mockAccountStates,
        favorite: true
      });

      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
      });

      const favoriteButton = screen.getByTestId('favorite-button');
      fireEvent.click(favoriteButton);

      await waitFor(() => {
        expect(authService.markAsFavorite).toHaveBeenCalledWith(
          123, // accountId
          'test-session-id', // sessionId
          870028, // movieId
          false // favorite
        );
      });
    });

    it('should call the correct API endpoint for account states', async () => {
      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(authService.getMovieAccountStates).toHaveBeenCalledWith(
          870028, // movieId
          'test-session-id' // sessionId
        );
      });
    });

    it('should show error message with correct data-testid when favorite toggle fails', async () => {
      (authService.markAsFavorite as jest.Mock).mockRejectedValue(new Error('Network error'));

      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
      });

      const favoriteButton = screen.getByTestId('favorite-button');
      fireEvent.click(favoriteButton);

      await waitFor(() => {
        expect(screen.getByTestId('favorite-error')).toBeInTheDocument();
      });

      const errorMessage = screen.getByTestId('favorite-error');
      expect(errorMessage).toHaveTextContent('Network error');
    });

    it('should disable favorite button while toggling', async () => {
      (authService.markAsFavorite as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
      );

      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
      });

      const favoriteButton = screen.getByTestId('favorite-button');
      fireEvent.click(favoriteButton);

      // Wait for the button to be disabled while loading
      await waitFor(() => {
        expect(favoriteButton).toBeDisabled();
      });
    });
  });

  describe('API Endpoint Verification', () => {
    it('should make all required API calls for movie details page', async () => {
      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        // Verify all API calls were made with correct movie ID
        expect(tmdbApi.getMovieDetails).toHaveBeenCalledWith(870028);
        expect(tmdbApi.getMovieVideos).toHaveBeenCalledWith(870028);
        expect(authService.getMovieAccountStates).toHaveBeenCalledWith(870028, 'test-session-id');
      });
    });

    it('should handle movie details API errors gracefully', async () => {
      (tmdbApi.getMovieDetails as jest.Mock).mockRejectedValue(new Error('API Error'));

      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Error loading movie details')).toBeInTheDocument();
      });
    });

    it('should verify correct API endpoints are called', async () => {
      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        // Verify movie details endpoint
        expect(tmdbApi.getMovieDetails).toHaveBeenCalledTimes(1);
        expect(tmdbApi.getMovieDetails).toHaveBeenCalledWith(870028);

        // Verify movie videos endpoint
        expect(tmdbApi.getMovieVideos).toHaveBeenCalledTimes(1);
        expect(tmdbApi.getMovieVideos).toHaveBeenCalledWith(870028);

        // Verify account states endpoint
        expect(authService.getMovieAccountStates).toHaveBeenCalledTimes(1);
        expect(authService.getMovieAccountStates).toHaveBeenCalledWith(870028, 'test-session-id');
      });
    });
  });

  describe('Data-testid Coverage', () => {
    it('should have data-testid on all movie info elements', async () => {
      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        // Check all movie info data-testids exist
        expect(screen.getByTestId('movie-details-page')).toBeInTheDocument();
        expect(screen.getByTestId('movie-title')).toBeInTheDocument();
        expect(screen.getByTestId('movie-poster')).toBeInTheDocument();
        expect(screen.getByTestId('movie-year')).toBeInTheDocument();
        expect(screen.getByTestId('movie-duration')).toBeInTheDocument();
        expect(screen.getByTestId('movie-rating')).toBeInTheDocument();
        expect(screen.getByTestId('movie-overview')).toBeInTheDocument();
      });
    });

    it('should have data-testid on all trailer elements', async () => {
      render(
        <TestWrapper>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        // Check all trailer data-testids exist
        expect(screen.getByTestId('trailers-section')).toBeInTheDocument();
        expect(screen.getByTestId('trailers-title')).toBeInTheDocument();
        expect(screen.getByTestId('trailer-buttons')).toBeInTheDocument();
        expect(screen.getByTestId('trailer-button-0')).toBeInTheDocument();
        expect(screen.getByTestId('trailer-button-1')).toBeInTheDocument();
      });
    });

    it('should have data-testid on favorite elements', async () => {
      render(
        <TestWrapper isAuthenticated={true}>
          <MovieDetailsPage />
        </TestWrapper>
      );

      await waitFor(() => {
        // Check favorite button data-testid
        expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
      });
    });
  });
}); 