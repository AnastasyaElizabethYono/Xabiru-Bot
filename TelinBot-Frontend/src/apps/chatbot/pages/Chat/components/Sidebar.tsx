import { useLogoutHandler } from '@/hooks/auth';
import {
  createNewSession,
  deleteSessionChat,
  getAllChatHistory,
  updateChatSessionTitle,
} from '@/services/chatbot';
import { RootState } from '@/types/auth/RootState';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faEllipsisH,
  faPencil,
  faSignOutAlt,
  faTrash,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface SidebarContentProps {
  isActive: boolean;
  handleSidebarToggler: () => void;
}

interface ChatHistoryData {
  id: string;
  title: string;
  scrollContainerRef: RefObject<HTMLDivElement>;
}

interface ModalActionProps {
  id: string;
  style: React.CSSProperties;
  onEditTitle: () => void;
  onDeleteSession: () => void;
}

const ModalAction: React.FC<ModalActionProps> = ({
  id,
  style,
  onEditTitle,
  onDeleteSession,
}) => {
  return (
    <div className="chat-history-modal-action" style={style}>
      <ul className="sidebar-modal">
        <li className="sidebar-modal-item" onClick={onEditTitle}>
          <FontAwesomeIcon icon={faPencil} />
          <span className="px-2">Ubah Nama</span>
        </li>
        <li className="sidebar-modal-item" onClick={onDeleteSession}>
          <FontAwesomeIcon icon={faTrash} className="text-danger" />
          <span className="text-danger px-2">Hapus</span>
        </li>
      </ul>
    </div>
  );
};

const ChatHistoryBar: React.FC<ChatHistoryData> = ({
  id,
  title,
  scrollContainerRef,
}) => {
  const { sessionId } = useParams();
  const [isModalActionOpen, setIsModalActionOpen] = useState(false);
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});
  const actionRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isDeleted, setIsDeleted] = useState(false);
  //konfirmasi modal delete
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      actionRef.current &&
      !actionRef.current.contains(event.target as Node)
    ) {
      setIsModalActionOpen(false);
    }
  };

  const updateModalPosition = () => {
    if (parentRef.current && scrollContainerRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      setModalStyle({
        position: 'fixed',
        top: parentRect.bottom - containerRect.top - 50,
        left: 235,
      });
    }
  };

  useEffect(() => {
    if (isModalActionOpen) {
      updateModalPosition();
      document.addEventListener('mousedown', handleClickOutside);
      scrollContainerRef.current?.addEventListener(
        'scroll',
        updateModalPosition
      );
      window.addEventListener('resize', updateModalPosition);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      scrollContainerRef.current?.removeEventListener(
        'scroll',
        updateModalPosition
      );
      window.removeEventListener('resize', updateModalPosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      scrollContainerRef.current?.removeEventListener(
        'scroll',
        updateModalPosition
      );
      window.removeEventListener('resize', updateModalPosition);
    };
  }, [isModalActionOpen]);

  const toggleModal = () => {
    setIsModalActionOpen(!isModalActionOpen);
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    setIsModalActionOpen(false); // Close the modal when editing starts
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      setIsEditingTitle(false);
      // Optionally update title in parent component or state if needed
      await updateChatSessionTitle(newTitle, id);
    }
  };

  const handleTitleBlur = async () => {
    setIsEditingTitle(false);
    // Optionally update title in parent component or state if needed
    await updateChatSessionTitle(newTitle, id);
  };
  //validasi delete
  const handleDeleteSession = async () => {
    setShowConfirmModal(false);
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus sesi ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });
    // await deleteSessionChat(id);
    // setIsDeleted(true);
    // setIsModalActionOpen(false);
    // if (sessionId === id) {
    //   navigate('/chatbot', { replace: true });
    // }

    if (result.isConfirmed) {
      await deleteSessionChat(id);
      setIsDeleted(true);
      setIsModalActionOpen(false);
      if (sessionId === id) {
        navigate('/chatbot', { replace: true });
      }

      Swal.fire({
        title: 'Berhasil!',
        text: 'Sesi telah berhasil dihapus.',
        icon: 'success',
        timer: 2000,
      });
    }
  };

  return (
    <div
      ref={parentRef}
      className={`d-flex justify-content-between align-items-center w-100 chat-history-container ${isDeleted ? 'hidden' : 'visible'}`}
    >
      <a href={`/chatbot/${id}`} className="text-limit w-100">
        {isEditingTitle ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            onBlur={handleTitleBlur}
            className="mx-5"
            autoFocus
          />
        ) : (
          <p className="text-start">{newTitle}</p>
        )}
      </a>
      <button className="button action-chat-history px-3" onClick={toggleModal}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
      {isModalActionOpen && (
        <div ref={actionRef}>
          <ModalAction
            id={id}
            style={modalStyle}
            onEditTitle={handleEditTitle}
            onDeleteSession={handleDeleteSession}
          />
        </div>
      )}
    </div>
  );
};

const ChatHistory = () => {
  const { id } = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = useState<ChatHistoryData[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getAllChatHistory(id);
      setData(responseData);
    };

    fetchData();
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-scroll h-100"
      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      {data.map((item) => {
        return (
          <div className="" key={item.id}>
            {/* //ini dapet dari mana  */}
            <ChatHistoryBar
              id={item.id}
              title={item.title}
              scrollContainerRef={scrollContainerRef}
            />
          </div>
        );
      })}
    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({
  isActive,
  handleSidebarToggler,
}) => {
  const { id, first_name, last_name } = useSelector(
    (state: RootState) => state.auth.user
  );

  const navigate = useNavigate();

  const handleNewChatSession = async () => {
    const responseData = await createNewSession(id);
    const sessionId = await responseData.detail.session_id;

    navigate(`/chatbot/${sessionId}`, { replace: true });
    window.location.reload();
  };

  const logout = useLogoutHandler();

  return (
    <div
      className={`d-flex flex-column chatbot-sidebar-content px-4 py-2 ${isActive ? 'active' : ''}`}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="button text-light p-2 hover-primary-light-1"
          onClick={handleSidebarToggler}
        >
          <FontAwesomeIcon icon={faBars} fontSize={20} />
        </button>
        <button
          className="button text-light p-2 hover-primary-light-1"
          style={{ fontSize: 22 }}
          onClick={handleNewChatSession}
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            fontSize={20}
            className="mx-2"
          />
          <span style={{ fontSize: 18 }}>Buat Baru</span>
        </button>
      </div>
      <div className="w-100" style={{ height: '80%' }}>
        <ChatHistory />
      </div>
      <div className="sidebar-footer justify-content-between">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-light"
            style={{ fontSize: 32, marginRight: 18 }}
          />
          <div>
            <p className="sidebar-username-text">{first_name}</p>
            <p className="sidebar-username-text">{last_name}</p>
          </div>
        </div>
        <button
          className="button d-flex align-items-center p-2 hover-primary-light-1"
          onClick={logout}
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="text-light"
            style={{ fontSize: 18, marginRight: 5 }}
          />
          <span className="text-light">Keluar</span>
        </button>
      </div>
    </div>
  );
};

function Sidebar() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div
      className={`d-flex chatbot-sidebar-container ${isSidebarActive ? 'active' : ''}`}
    >
      <SidebarContent
        isActive={isSidebarActive}
        handleSidebarToggler={toggleSidebar}
      />
      <div
        className={`chatbot-sidebar-overlay ${isSidebarActive ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
      <div className="sidebar-button-active-container">
        {!isSidebarActive && (
          <button
            className="button hover-medium-gray p-2"
            onClick={toggleSidebar}
            style={{ margin: '0.7rem 1.5rem' }}
          >
            <FontAwesomeIcon icon={faBars} fontSize={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
