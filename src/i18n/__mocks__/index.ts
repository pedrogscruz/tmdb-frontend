import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        movies: "Movies",
        login: "Login",
        logout: "Logout",
        category: "Category"
      },
      home: {
        categories: {
          popular: "Popular",
          nowPlaying: "Now Playing",
          topRated: "Top Rated",
          upcoming: "Upcoming"
        },
        errorLoadingMovies: "Error loading movies"
      },
      movieDetails: {
        backButton: "Back",
        mins: "mins",
        errorLoadingDetails: "Error loading movie details"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 