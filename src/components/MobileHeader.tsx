import { useTranslation } from 'react-i18next';
import './MobileHeader.css';

export const MobileHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="mobile-header" data-testid="mobile-header">
      <h1 className="mobile-header__title">
        {t('common.movies')}
      </h1>

      <div className="mobile-header__menu">
        <button 
          className="mobile-header__menu-button"
          aria-label="Menu"
        >
          <div className="mobile-header__dots">
            <span className="mobile-header__dot"></span>
            <span className="mobile-header__dot"></span>
            <span className="mobile-header__dot"></span>
          </div>
        </button>
      </div>
    </div>
  );
}; 