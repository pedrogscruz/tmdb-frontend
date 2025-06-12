import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authService, sessionStorage } from '../services/authService';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'confirm' | 'redirecting' | 'processing'>('confirm');

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setStep('redirecting');

      // Step 2: Create request token
      const tokenResponse = await authService.createRequestToken();
      
      if (!tokenResponse.success) {
        throw new Error(t('auth.authenticationFailed'));
      }

      // Step 3: Redirect to TMDb for approval
      const approvalUrl = authService.getApprovalUrl(tokenResponse.request_token);
      
      // Store token temporarily for when user returns
      sessionStorage.setSessionId(tokenResponse.request_token);
      
      // Open TMDb authentication in new window
      const authWindow = window.open(
        approvalUrl,
        'tmdb-auth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      // Poll for window closure (user completed authentication)
      const pollTimer = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(pollTimer);
          handleAuthReturn(tokenResponse.request_token);
        }
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.authenticationFailed'));
      setIsLoading(false);
      setStep('confirm');
    }
  };

  const handleAuthReturn = async (requestToken: string) => {
    try {
      setStep('processing');

      // Step 4: Create session
      const sessionResponse = await authService.createSession(requestToken);
      
      if (!sessionResponse.success) {
        throw new Error('Failed to create session');
      }

      // Step 5: Get account details
      const accountResponse = await authService.getAccountDetails(sessionResponse.session_id);

      // Store session data
      sessionStorage.setSessionId(sessionResponse.session_id);
      sessionStorage.setAccountId(accountResponse.id);
      sessionStorage.setUsername(accountResponse.username);

      // Success!
      onLoginSuccess();
      onClose();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete authentication');
      setStep('confirm');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    setStep('confirm');
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <div className="login-modal__header">
          <h2 className="login-modal__title">{t('auth.loginTitle')}</h2>
          <button 
            className="login-modal__close"
            onClick={handleCancel}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <div className="login-modal__content">
          {step === 'confirm' && (
            <>
              <p className="login-modal__description">
                {t('auth.loginDescription')}
              </p>
              <p className="login-modal__note">
                {t('auth.loginInfo')}
              </p>
            </>
          )}

          {step === 'redirecting' && (
            <div className="login-modal__status">
              <div className="login-modal__spinner"></div>
              <p>{t('auth.redirectingDescription')}</p>
              <p className="login-modal__instruction">
                {t('auth.redirectingInfo')}
              </p>
            </div>
          )}

          {step === 'processing' && (
            <div className="login-modal__status">
              <div className="login-modal__spinner"></div>
              <p>{t('auth.authenticating')}</p>
            </div>
          )}

          {error && (
            <div className="login-modal__error">
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="login-modal__actions">
          {step === 'confirm' && (
            <>
              <button 
                className="login-modal__button login-modal__button--secondary"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {t('common.cancel')}
              </button>
              <button 
                className="login-modal__button login-modal__button--primary"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {t('auth.confirmLogin')}
              </button>
            </>
          )}

          {(step === 'redirecting' || step === 'processing') && (
            <button 
              className="login-modal__button login-modal__button--secondary"
              onClick={handleCancel}
            >
              {t('common.cancel')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 