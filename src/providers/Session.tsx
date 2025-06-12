import { createContext, useState, useEffect } from 'react';
import { sessionStorage } from '../services/authService';
import { LoginModal } from '../components/LoginModal';

interface SessionContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  handleLoginClick: () => void;
  handleLogoutClick: () => void;
  username: string | null;
}

export const SessionContext = createContext<SessionContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  handleLoginClick: () => {},
  handleLogoutClick: () => {},
  username: null,
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing session on component mount
  useEffect(() => {
    const hasSession = sessionStorage.hasValidSession();
    setIsLoggedIn(hasSession);
    
    // Show login modal if no session exists
    if (!hasSession) {
      // Delay to show modal after initial render
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLogoutClick = () => {
    sessionStorage.clearSession();
    setIsLoggedIn(false);
  };

  const username = sessionStorage.getUsername();

  return (
    <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLoginClick, handleLogoutClick, username }}>
      {children}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </SessionContext.Provider>
  );
}; 