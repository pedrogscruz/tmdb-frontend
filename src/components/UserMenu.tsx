import { useContext, useEffect, useRef, useState } from 'react';
import { SessionContext } from '../providers/Session';
import './UserMenu.css';

export const UserMenu = () => {
  const { isLoggedIn, handleLoginClick, handleLogoutClick, username } = useContext(SessionContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="desktop-header__user-menu" ref={userMenuRef}>
      <button 
        className="desktop-header__user-button"
        onClick={toggleUserMenu}
        aria-label="User menu"
      >
        <div className="desktop-header__user-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
      
      {isUserMenuOpen && (
        <div className="desktop-header__user-dropdown">
          {isLoggedIn ? (
            <>
              <div className="desktop-header__user-info">
                <div className="desktop-header__username">{username}</div>
              </div>
              <button
                className="desktop-header__dropdown-item"
                onClick={() => {
                  handleLogoutClick();
                  setIsUserMenuOpen(false);
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <button
              className="desktop-header__dropdown-item"
              onClick={() => {
                handleLoginClick();
                setIsUserMenuOpen(false);
              }}
            >
              Log in
            </button>
          )}
        </div>
      )}
    </div>
  );
};