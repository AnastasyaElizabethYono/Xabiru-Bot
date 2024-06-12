import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ConfirmDeleteModalProps {
  deleteTitle?: string;
  deleteMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  deleteTitle,
  deleteMessage,
  onConfirm,
  onCancel,
}) => {
  const handleOverlayClick = () => {
    onCancel();
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
              <h1 className="fw-medium mb-3">
                {deleteTitle ?? 'Confirm Delete'}
              </h1>
              <p>
                {deleteMessage ??
                  'Are you sure you want to delete this item? This action cannot be undone.'}
              </p>
            </div>
            <div className="mb-2 d-flex justify-content-around">
              <button className="button button-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button className="button button-danger" onClick={onConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
