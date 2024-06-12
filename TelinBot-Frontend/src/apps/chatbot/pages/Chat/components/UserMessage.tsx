import { faRobot, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface SenderType {
  sender: 'user' | 'bot';
}

interface ChatBoxProps {
  sender: 'user' | 'bot';
  message: string;
}

const SenderIcon: React.FC<SenderType> = ({ sender }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <FontAwesomeIcon
        icon={sender === 'user' ? faUserCircle : faRobot}
        fontSize={20}
      />
    </div>
  );
};

const SenderName: React.FC<{ name: string }> = ({ name }) => {
  return <span className="mx-2 chatbot-username">{name}</span>;
};

const SenderEntity: React.FC<SenderType> = ({ sender }) => {
  return (
    <div className={`d-flex ${sender === 'user' ? 'justify-content-end' : ''}`}>
      {sender === 'user' ? (
        <div className="d-flex align-items-center">
          <SenderName name="You" />
          <SenderIcon sender="user" />
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <SenderIcon sender="bot" />
          <SenderName name="XabiruBot" />
        </div>
      )}
    </div>
  );
};

const UserMessage: React.FC<ChatBoxProps> = ({ sender, message }) => {
  return (
    <div>
      <div className="mb-2">
        <SenderEntity sender={sender} />
      </div>
      <div
        className={`chatbot-message-container sender-${sender === 'user' ? 'user' : 'bot'}`}
        style={{ margin: '0 2rem' }}
      >
        <p className="chatbot-message">{message}</p>
      </div>
    </div>
  );
};

export default UserMessage;
