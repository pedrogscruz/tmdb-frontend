import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MovieCard } from '../MovieCard';
import type { Movie } from '../../types/tmdb';

// Mock useMediaQuery hook
jest.mock('../../hooks/useMediaQuery');
import useMediaQuery from '../../hooks/useMediaQuery';
const mockedUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  original_title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/test-backdrop.jpg',
  vote_average: 8.5,
  vote_count: 100,
  release_date: '2023-06-01',
  popularity: 100,
  adult: false,
  video: false,
  genre_ids: [1, 2, 3],
  original_language: 'en',
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('MovieCard', () => {
  beforeEach(() => {
    mockedUseMediaQuery.mockReturnValue(false); // Desktop by default
  });

  it('should render movie data correctly', () => {
    render(
      <TestWrapper>
        <MovieCard movie={mockMovie} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Movie')).toBeDefined();
    expect(screen.getByText('2023')).toBeDefined();
    expect(screen.getByText('⭐ 8.5')).toBeDefined();
  });

  it('should use w342 image size on desktop', () => {
    mockedUseMediaQuery.mockReturnValue(false);
    
    render(
      <TestWrapper>
        <MovieCard movie={mockMovie} />
      </TestWrapper>
    );

    const image = screen.getByAltText('Test Movie');
    expect(image.getAttribute('src')).toContain('w342');
  });

  it('should use w185 image size on mobile', () => {
    mockedUseMediaQuery.mockReturnValue(true);
    
    render(
      <TestWrapper>
        <MovieCard movie={mockMovie} />
      </TestWrapper>
    );

    const image = screen.getByAltText('Test Movie');
    expect(image.getAttribute('src')).toContain('w185');
  });
}); 