import { useTranslation } from 'react-i18next';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  const { t } = useTranslation();
  return (
    <div className="error-message">
      <div className="error-message__icon">⚠️</div>
      <h3 className="error-message__title">{t('common.errorSomethingWentWrong')}</h3>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__button" onClick={onRetry}>
          {t('common.tryAgain')}
        </button>
      )}
    </div>
  );
}; 