import { useTranslation } from 'react-i18next';
import type { MovieCategory } from '../services/tmdbApi';
import './CategoryFilter.css';

interface CategoryItem {
  key: MovieCategory;
  label: string;
}

interface CategoryFilterProps {
  selectedCategory: MovieCategory;
  onCategoryChange: (category: MovieCategory) => void;
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { t } = useTranslation();
  
  const categories: CategoryItem[] = [
    { key: 'popular', label: t('home.categories.popular') },
    { key: 'now_playing', label: t('home.categories.nowPlaying') },
    { key: 'top_rated', label: t('home.categories.topRated') },
    { key: 'upcoming', label: t('home.categories.upcoming') },
  ];
  return (
    <div className="category-filter" data-testid="category-filter">
      <div className="category-filter__container">
        {categories.map((category) => (
          <button
            key={category.key}
            className={`category-filter__button ${
              selectedCategory === category.key ? 'category-filter__button--active' : ''
            }`}
            onClick={() => onCategoryChange(category.key)}
            data-testid={`category-button-${category.key}`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 