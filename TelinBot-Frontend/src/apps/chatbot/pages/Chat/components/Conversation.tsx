import React from 'react';
import UserMessage from './UserMessage';
import { Message } from '@/types/api/ChatSessionHistory';
interface ConversationProps {
  messages: Message[];
}

const NoMessages = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '75vh' }}
    >
      <p className="text-center" style={{ fontSize: 50 }}>
        Hallo! Apa Yang Bisa Saya Bantu?
      </p>
    </div>
  );
};

const Messages: React.FC<ConversationProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((item, index) => {
        return (
          <div className="mb-3" key={'message-' + index}>
            <UserMessage
              sender={item.sender === 1 ? 'user' : 'bot'}
              message={item.message}
            />
          </div>
        );
      })}
    </div>
  );
};

const Conversation: React.FC<ConversationProps> = ({ messages }) => {
  return (
    <div className="d-flex justify-content-center chatbot-content-container">
      <div className="col-lg-8 col-md-9 col-sm-10 col-11">
        {messages.length > 0 ? (
          <div className="mt-4">
            <Messages messages={messages} />
          </div>
        ) : (
          <NoMessages />
        )}
      </div>
    </div>
  );
};

export default Conversation;
