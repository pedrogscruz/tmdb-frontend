import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SessionContext } from '../providers/Session';
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
  const sessionContext = useContext(SessionContext);

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

  const handleLoginClick = () => {
    sessionContext.handleLoginClick();
  };

  const handleLogoutClick = () => {
    sessionContext.handleLogoutClick();
  };

  return (
    <div className="mobile-header" data-testid="mobile-header">
      <h1 className="mobile-header__title">
        {currentCategory?.label || t('common.movies')}
      </h1>

      <ThreeDotsDropdown
        data-testid="mobile-category-dropdown"
        sections={[
          sessionContext.isLoggedIn ? {
            label: (
              <div className="mobile-header__user-info">
                <div className="mobile-header__user-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="mobile-header__username">{sessionContext.username}</span>
              </div>
            ),
            items: [
              {
                label: t('common.logout'),
                onClick: handleLogoutClick,
                className: 'mobile-header__logout-btn'
              },
            ],
            className: 'mobile-header__user-section'
          } : {
            items: [
              {
                label: t('common.login'),
                onClick: handleLoginClick,
                className: 'mobile-header__login-btn'
              },
            ],
            className: 'mobile-header__user-section'
          },
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