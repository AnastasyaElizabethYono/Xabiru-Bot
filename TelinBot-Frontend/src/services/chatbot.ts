import {
  ChatMessage,
  ChatSessionResponse,
} from '@/types/api/ChatSessionHistory';
import api from './api';

const getAllChatHistory = async (userId: number) => {
  return (await api.get(`api/chatbot/session/${userId}`)).data;
};

const getSessionChat = async (sessionId: string): Promise<ChatMessage[]> => {
  return (await api.get(`api/chatbot/${sessionId}`)).data;
};

const createNewSession = async (userId: number) => {
  const response = await api.post(`api/chatbot/session/${userId}`);
  return response.data;
};

const sendMessage = async (
  message: string,
  sessionId: string
): Promise<ChatSessionResponse> => {
  const formData = new FormData();
  formData.append('message', message);
  const response = await api.post(`api/chatbot/${sessionId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

const updateChatSessionTitle = async (newTitle: string, sessionId: string) => {
  const formData = new FormData();
  formData.append('new_title', newTitle);
  await api.patch(`api/chatbot/${sessionId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteSessionChat = async (sessionId: string) => {
  await api.delete(`api/chatbot/${sessionId}`);
};

export {
  getAllChatHistory,
  getSessionChat,
  sendMessage,
  createNewSession,
  updateChatSessionTitle,
  deleteSessionChat,
};
