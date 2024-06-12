// Define type for an individual chat message
export interface ChatMessage {
  id: number;
  sender: number;
  message: string;
  created_at: string;
}

export interface Message {
  sender: number;
  message: string;
}

// Define type for the detail object containing both 'send' and 'reply' messages
export interface ChatDetail {
  send: ChatMessage;
  reply: ChatMessage;
}

// Define type for the root object
export interface ChatSessionResponse {
  message: string;
  detail: ChatDetail;
}

export interface ChatSession {
  id: number;
  title: string;
}
