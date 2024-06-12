import { useState, createContext, useContext } from 'react';
import telinbotLogo from '@/assets/Logo Telinbot.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatConversation } from '@/components';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/auth/RootState';

interface ChatContextData {
  toggleChatBox: () => void;
  toggleLiveChat: () => void;
  isLiveChatOpen: boolean;
}

const ChatContext = createContext<ChatContextData>({
  toggleChatBox: () => {},
  toggleLiveChat: () => {},
  isLiveChatOpen: false,
});

const UserChatForm = () => {
  const { toggleLiveChat } = useContext(ChatContext);

  return (
    <div className="chatbox body-content">
      <div className="content d-flex flex-column justify-content-evenly align-items-center">
        <img
          src={telinbotLogo}
          alt=""
          className="mb-2"
          style={{ width: 110, height: 110, borderRadius: '20px' }}
        />
        <p className="text-center">
          <strong style={{ fontSize: '16px' }}>
            Hi! Selamat Datang di livechat Telkomsel.
          </strong>{' '}
          <br /> Mohon Isi data diri anda di bawah ini:
        </p>
        <form action="" className="px-3 mb-2">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nama" />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nomor Handphone"
            />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className=" form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label
              className="form-check-label text-justify"
              htmlFor="exampleCheck1"
            >
              <span className="text-dark">
                Saya telah membaca & setuju dengan syarat serta ketentuan
                mengenai{' '}
              </span>
              <a href="/" className="form-check-label">
                Privasi karyawan PT Telekomunikasi Indonesia
              </a>
            </label>
          </div>
        </form>
      </div>
      <button
        className="button button-primary w-75 align-self-center"
        onClick={toggleLiveChat}
      >
        Mulai Livechat
      </button>
    </div>
  );
};

const SignInRequired = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <p>Authentication required to use Chatbot</p>
      <a href="/auth/sign-in" className="button button-primary">
        Sign In
      </a>
    </div>
  );
};

const Chat = () => {
  return (
    <div className="chatbox body-content">
      <div className="d-flex justify-content-center align-items-center">
        <p className="col-8" style={{ fontSize: '22px' }}>
          <strong>Hello</strong>, I'm your AI Assistant!
        </p>
        <img
          src={telinbotLogo}
          alt=""
          className="col-4 mb-2"
          style={{ width: 70, height: 70, borderRadius: '15px' }}
        />
      </div>
      <div className="conversation-container flex-grow-1 mb-2">
        <ChatConversation />
      </div>
      <div className="d-flex">
        <textarea
          className="form-control"
          placeholder="Type your message..."
          style={{ borderRadius: '20px', height: '2.5rem', resize: 'none' }}
        ></textarea>
        <button className="button button-send">
          <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
        </button>
      </div>
    </div>
  );
};

const ChatBox = () => {
  const { toggleChatBox, isLiveChatOpen } = useContext(ChatContext);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="chatbox container">
      <div className="chatbox header d-flex align-items-center justify-content-end border-bottom p-2">
        <button
          className="button"
          onClick={toggleChatBox}
          style={{ marginRight: 8 }}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
      <div className="p-3">
        {isAuthenticated ? <Chat /> : <SignInRequired />}
      </div>
    </div>
  );
};

const ChatAction = () => {
  const { toggleChatBox } = useContext(ChatContext);
  return (
    <button className="button chat-action shadow p-3" onClick={toggleChatBox}>
      <FontAwesomeIcon icon={faCommentDots} />
    </button>
  );
};

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  const toggleChatBox = () => {
    setIsChatOpen((prev) => !prev);
  };

  const toggleLiveChat = () => {
    setIsLiveChatOpen((prev) => !prev);
  };

  return (
    <div className="pop-up-chat m-5">
      <ChatContext.Provider
        value={{ toggleChatBox, toggleLiveChat, isLiveChatOpen }}
      >
        {!isChatOpen ? <ChatAction /> : <ChatBox />}
      </ChatContext.Provider>
    </div>
  );
}

export default Chatbot;
