import { createNewSession } from '@/services/chatbot';
import { RootState } from '@/types/auth/RootState';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ChatbotRedirect() {
  const { id } = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const newChatSession = async () => {
        const responseData = await createNewSession(id);
        const sessionId = await responseData.detail.session_id;
        navigate(`/chatbot/${sessionId}`, { replace: true });
      };
      newChatSession();
    }
  }, [id, navigate]);

  return null;
}

export default ChatbotRedirect;
