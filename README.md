# TMDB Frontend

A React + TypeScript application for browsing and managing movie favorites using The Movie Database (TMDB) API.

## Key Features

### 🎬 Movie Browsing
- **Skeleton Loading**: Smooth loading states with skeleton placeholders for movies and details
- **Infinite Scroll**: Seamless infinite loading for movie lists with categories (popular, top rated, now playing, upcoming)

### 🔐 Authentication
- **TMDB Session**: OAuth-based authentication flow with TMDB for user login
- **Favorite Actions**: Add/remove movies to/from favorites with authenticated API calls

### 🧪 Testing
- **E2E Tests**: Comprehensive test coverage for movie details page
- **Component Tests**: Unit tests for key components with mocked data
- **API Testing**: Endpoint verification for movie details, videos, and favorites

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_API_TOKEN=your_api_token_here
```

Get your API credentials from [TMDB Settings](https://www.themoviedb.org/settings/api).

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
src/
├── components/     # Reusable UI components with skeleton loaders
├── hooks/         # Custom hooks for movies and favorites
├── pages/         # Main pages (Home, MovieDetails)
├── services/      # API services (TMDB, Auth)
├── providers/     # Context providers (Session)
└── __tests__/     # Test files with comprehensive coverage
```
