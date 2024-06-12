import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, close, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <span className='fw-bold fst-italic'>{title}</span>
          <button onClick={close} className="button">
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
