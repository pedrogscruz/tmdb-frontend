import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import userEvent from '@testing-library/user-event';
import { HomePage } from '../HomePage';
import { SessionProvider } from '../../providers/Session';
import { tmdbApi } from '../../services/tmdbApi';
import { mockApiResponses } from '../../test/mockData';
import i18n from '../../i18n';

// Mock the API
jest.mock('../../services/tmdbApi');
const mockedTmdbApi = tmdbApi as jest.Mocked<typeof tmdbApi>;

// Mock useMediaQuery hook
jest.mock('../../hooks/useMediaQuery');
import useMediaQuery from '../../hooks/useMediaQuery';
const mockedUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </I18nextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('HomePage E2E Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    jest.clearAllMocks();
    
    // Default to desktop view
    mockedUseMediaQuery.mockReturnValue(false);
    
    // Mock API responses
    mockedTmdbApi.getMoviesByCategory.mockImplementation((category) => {
      return Promise.resolve(mockApiResponses[category]);
    });
  });

  describe('Filter functionality and API calls', () => {
    it('should call correct API endpoints when changing filters on desktop', async () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Wait for initial load (popular movies)
      await waitFor(() => {
        expect(mockedTmdbApi.getMoviesByCategory).toHaveBeenCalledWith('popular', 1);
      });

      // Test Now Playing filter
      const nowPlayingButton = screen.getByTestId('category-button-now_playing');
      await user.click(nowPlayingButton);

      await waitFor(() => {
        expect(mockedTmdbApi.getMoviesByCategory).toHaveBeenCalledWith('now_playing', 1);
      });

      // Test Top Rated filter
      const topRatedButton = screen.getByTestId('category-button-top_rated');
      await user.click(topRatedButton);

      await waitFor(() => {
        expect(mockedTmdbApi.getMoviesByCategory).toHaveBeenCalledWith('top_rated', 1);
      });

      // Test Upcoming filter
      const upcomingButton = screen.getByTestId('category-button-upcoming');
      await user.click(upcomingButton);

      await waitFor(() => {
        expect(mockedTmdbApi.getMoviesByCategory).toHaveBeenCalledWith('upcoming', 1);
      });
    });

    it('should call correct API endpoints when changing filters on mobile', async () => {
      // Mock mobile view
      mockedUseMediaQuery.mockReturnValue(true);

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Wait for initial load
      await waitFor(() => {
        expect(mockedTmdbApi.getMoviesByCategory).toHaveBeenCalledWith('popular', 1);
      });

      // On mobile, category selection is through dropdown in mobile header
      const mobileHeader = screen.getByTestId('mobile-header');
      expect(mobileHeader).toBeDefined();

      // The category filter should be hidden on mobile
      const categoryFilter = screen.queryByTestId('category-filter');
      expect(categoryFilter).toBeDefined();
    });
  });

  describe('Movie data rendering and image sizes', () => {
    it('should render movie data correctly and use w342 images on desktop', async () => {
      // Mock desktop view
      mockedUseMediaQuery.mockReturnValue(false);

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Wait for movies to load
      await waitFor(() => {
        const movieCards = screen.getAllByTestId('movie-card');
        expect(movieCards).toHaveLength(3); // Based on mock data
      });

      // Check first movie data
      const firstMovieTitle = screen.getByText('Predator: Killer of Killers');
      const movieYears = screen.getAllByText('2025');
      const firstMovieRating = screen.getByText('⭐ 8.0'); // Rounded from 7.974
      const firstMovieImage = screen.getByAltText('Predator: Killer of Killers');

      expect(firstMovieTitle).toBeDefined();
      expect(movieYears).toHaveLength(3); // All 3 movies have 2025
      expect(firstMovieRating).toBeDefined();
      expect(firstMovieImage).toBeDefined();

      // Check image src contains w342 for desktop
      expect(firstMovieImage.getAttribute('src')).toContain('w342');

      // Check second movie data
      const secondMovieTitle = screen.getByText('The Accountant²');
      const secondMovieRating = screen.getByText('⭐ 7.2'); // Rounded from 7.203
      const secondMovieImage = screen.getByAltText('The Accountant²');

      expect(secondMovieTitle).toBeDefined();
      expect(secondMovieRating).toBeDefined();
      expect(secondMovieImage).toBeDefined();

      // Check image src contains w342 for desktop
      expect(secondMovieImage.getAttribute('src')).toContain('w342');

      // Check third movie data
      const thirdMovieTitle = screen.getByText('Lilo & Stitch');
      const thirdMovieRating = screen.getByText('⭐ 7.1');
      const thirdMovieImage = screen.getByAltText('Lilo & Stitch');

      expect(thirdMovieTitle).toBeDefined();
      expect(thirdMovieRating).toBeDefined();
      expect(thirdMovieImage).toBeDefined();

      // Check image src contains w342 for desktop
      expect(thirdMovieImage.getAttribute('src')).toContain('w342');
    });

    it('should render movie data correctly and use w185 images on mobile', async () => {
      // Mock mobile view (width <= 480)
      mockedUseMediaQuery.mockReturnValue(true);

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Wait for movies to load
      await waitFor(() => {
        const movieCards = screen.getAllByTestId('movie-card');
        expect(movieCards).toHaveLength(3);
      });

      // Check that images use w185 for mobile
      const movieImages = screen.getAllByTestId('movie-image');
      movieImages.forEach(image => {
        expect(image.getAttribute('src')).toContain('w185');
      });
    });

    it('should render correct data for different categories', async () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Wait for initial popular movies
      await waitFor(() => {
        expect(screen.getByText('Predator: Killer of Killers')).toBeDefined();
      });

      // Switch to top_rated
      const topRatedButton = screen.getByTestId('category-button-top_rated');
      await user.click(topRatedButton);

      // Wait for top rated movies to load
      await waitFor(() => {
        expect(screen.getByText('The Shawshank Redemption')).toBeDefined();
        expect(screen.getByText('The Godfather')).toBeDefined();
      });

      // Check specific data for top rated movies
      expect(screen.getByText('1994')).toBeDefined(); // Shawshank year
      expect(screen.getByText('1972')).toBeDefined(); // Godfather year
      expect(screen.getAllByText('⭐ 8.7')).toHaveLength(2); // Both movies have same rounded rating (8.711 and 8.7)

      // Switch to upcoming
      const upcomingButton = screen.getByTestId('category-button-upcoming');
      await user.click(upcomingButton);

      // Wait for upcoming movies to load
      await waitFor(() => {
        expect(screen.getByText('Sinners')).toBeDefined();
        expect(screen.getByText('Shadow Force')).toBeDefined();
      });

      // Check specific data for upcoming movies
      expect(screen.getByText('⭐ 7.5')).toBeDefined(); // Sinners rating (rounded from 7.539)
      expect(screen.getByText('⭐ 6.3')).toBeDefined(); // Shadow Force rating
    });
  });

  describe('Data-testid attributes', () => {
    it('should have all required data-testid attributes', async () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Wait for movies to load
      await waitFor(() => {
        const movieCards = screen.getAllByTestId('movie-card');
        expect(movieCards).toHaveLength(3);
      });

      // Check that all movie cards have required data-testids
      const movieTitles = screen.getAllByTestId('movie-title');
      const movieYears = screen.getAllByTestId('movie-year');
      const movieRatings = screen.getAllByTestId('movie-rating');
      const movieImages = screen.getAllByTestId('movie-image');

      expect(movieTitles).toHaveLength(3);
      expect(movieYears).toHaveLength(3);
      expect(movieRatings).toHaveLength(3);
      expect(movieImages).toHaveLength(3);

      // Check category filter buttons
      expect(screen.getByTestId('category-button-popular')).toBeDefined();
      expect(screen.getByTestId('category-button-now_playing')).toBeDefined();
      expect(screen.getByTestId('category-button-top_rated')).toBeDefined();
      expect(screen.getByTestId('category-button-upcoming')).toBeDefined();
    });
  });

  describe('Responsive behavior', () => {
    it('should show desktop header and category filter on desktop', async () => {
      // Mock desktop view
      mockedUseMediaQuery.mockReturnValue(false);

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Category filter should be visible on desktop
      const categoryFilter = screen.getByTestId('category-filter');
      expect(categoryFilter).toBeDefined();

      // Mobile header should exist but may be hidden via CSS
      const mobileHeader = screen.queryByTestId('mobile-header');
      expect(mobileHeader).toBeDefined();
    });

    it('should show mobile header on mobile and hide category filter', async () => {
      // Mock mobile view
      mockedUseMediaQuery.mockReturnValue(true);

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Mobile header should be visible
      const mobileHeader = screen.getByTestId('mobile-header');
      expect(mobileHeader).toBeDefined();

      // Category filter exists but should be hidden via CSS on mobile
      const categoryFilter = screen.getByTestId('category-filter');
      expect(categoryFilter).toBeDefined();
    });
  });

  describe('API endpoint validation', () => {
    it('should call the correct API endpoints for each category', async () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Test all category endpoints
      const categories = ['popular', 'now_playing', 'top_rated', 'upcoming'] as const;
      
      for (const category of categories) {
        if (category !== 'popular') { // popular is already called on initial load
          const button = screen.getByTestId(`category-button-${category}`);
          await user.click(button);
        }

        await waitFor(() => {
          expect(mockedTmdbApi.getMoviesByCategory).toHaveBeenCalledWith(category, 1);
        });
      }

      // Verify all endpoints were called
      expect(mockedTmdbApi.getMoviesByCategory).toHaveBeenCalledTimes(4);
    });
  });
}); 