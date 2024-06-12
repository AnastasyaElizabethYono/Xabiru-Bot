import { Chat } from '@/apps/chatbot/pages';
import ChatbotRedirect from '@/components/ChatbotRedirect';

export const chatbotRoutes = {
  path: '/chatbot',
  children: [
    { index: true, element: <ChatbotRedirect /> },
    { path: ':sessionId', element: <Chat /> },
  ],
};
