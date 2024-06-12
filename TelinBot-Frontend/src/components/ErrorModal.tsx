import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ErrorModalProps {
  errorTitle?: string;
  errorMessage?: string;
  onModalToggle: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  errorTitle,
  errorMessage,
  onModalToggle,
}) => {
  const handleOverlayClick = () => {
    onModalToggle();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={handleContentClick}>
        <div className="modal-content">
          <div
            className="d-flex flex-column text-center"
            style={{ width: 480 }}
          >
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-danger mb-4"
              fontSize={125}
            />
            <div className="mb-4">
              <h1 className="fw-medium mb-3">{errorTitle ?? 'Error!'}</h1>
              <p>
                {errorMessage ??
                  'Something went wrong. Please try again later.'}
              </p>
            </div>
            <div className="mb-2">
              <button className="button button-primary" onClick={onModalToggle}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
