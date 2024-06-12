import Header from './Header';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import Conversation from './Conversation';
import { useEffect, useState } from 'react';
import { getSessionChat, updateChatSessionTitle } from '@/services/chatbot';
import { Message } from '@/types/api/ChatSessionHistory';
import { useParams } from 'react-router-dom';

function Main() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getSessionChat(sessionId);
      responseData.map((item) => {
        handleMessage({ sender: item.sender, message: item.message });
      });
      setMessages(responseData);
    };
    fetchData();
  }, []);

  const handleMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const setInitialMessage = async (newTitle: string) => {
    await updateChatSessionTitle(newTitle, sessionId);
  };

  useEffect(() => {
    if (messages.length == 1) {
      const newTitle = messages[0].message;
      setInitialMessage(newTitle);
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className='chat-container'>
        <Conversation messages={messages} />
      </div>
      <div className="d-flex justify-content-center chatbot-input-container">
        <ChatInput handleMessage={handleMessage} />
      </div>
    </div>
  );
}

export default Main;
