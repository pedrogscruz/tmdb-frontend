import { useTranslation } from 'react-i18next';
import type { MovieCategory } from '../services/tmdbApi';
import './DesktopHeader.css';

interface CategoryItem {
  key: MovieCategory;
  label: string;
}

interface DesktopHeaderProps {
  selectedCategory: MovieCategory;
}

export const DesktopHeader = ({ selectedCategory }: DesktopHeaderProps) => {
  const { t } = useTranslation();
  
  const categories: CategoryItem[] = [
    { key: 'popular', label: t('home.categories.popular') },
    { key: 'now_playing', label: t('home.categories.nowPlaying') },
    { key: 'top_rated', label: t('home.categories.topRated') },
    { key: 'upcoming', label: t('home.categories.upcoming') },
  ];

  const currentCategory = categories.find(cat => cat.key === selectedCategory);

  return (
    <header className="desktop-header">
      <div className="desktop-header__left">
        <h1 className="desktop-header__category">
          {currentCategory?.label || t('common.movies')}
        </h1>
      </div>
    </header>
  );
}; 