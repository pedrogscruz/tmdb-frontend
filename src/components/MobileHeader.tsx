import { useTranslation } from 'react-i18next';
import ThreeDotsDropdown from './ThreeDotsDropdown';
import type { MovieCategory } from '../services/tmdbApi';
import './MobileHeader.css';

interface CategoryItem {
  key: MovieCategory;
  label: string;
}

interface MobileHeaderProps {
  selectedCategory: MovieCategory;
  onCategoryChange: (category: MovieCategory) => void;
}

export const MobileHeader = ({ selectedCategory, onCategoryChange }: MobileHeaderProps) => {
  const { t } = useTranslation();

  const categories: CategoryItem[] = [
    { key: 'popular', label: t('home.categories.popular') },
    { key: 'now_playing', label: t('home.categories.nowPlaying') },
    { key: 'top_rated', label: t('home.categories.topRated') },
    { key: 'upcoming', label: t('home.categories.upcoming') },
  ];

  const currentCategory = categories.find(cat => cat.key === selectedCategory);

  const handleCategorySelect = (category: MovieCategory) => {
    onCategoryChange(category);
  };

  return (
    <div className="mobile-header" data-testid="mobile-header">
      <h1 className="mobile-header__title">
        {currentCategory?.label || t('common.movies')}
      </h1>

      <ThreeDotsDropdown
        data-testid="mobile-category-dropdown"
        sections={[
          {
            label: t('common.category'),
            items: categories.map((category) => ({
              label: category.label,
              onClick: () => handleCategorySelect(category.key),
              className: selectedCategory === category.key ? 'mobile-header__dropdown-item--active' : undefined
            }))
          }
        ]}
      />
    </div>
  );
}; 