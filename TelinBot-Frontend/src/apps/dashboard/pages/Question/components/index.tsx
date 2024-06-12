import { ContentWrapper } from '@/apps/dashboard/components';
import Modal from '@/components/Modal';
import QuestionAnswer from '@/components/QuestionAnswer';
import { deleteFaq, getFaqs, patchFaq, postFaq } from '@/services/faq';
import { PaginatedResponse } from '@/types/api/PaginatedResponse';
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  ChangeEvent,
  FormEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
}

interface ModalEditProps {
  id?: number;
  question?: string;
  answer?: string;
  is_active?: boolean;
  isOpen: boolean;
  closeFn: () => void;
}

const ActionContext = createContext();

const ModalAction: React.FC<ModalEditProps> = ({
  id,
  question,
  answer,
  isOpen,
  is_active,
  closeFn,
}) => {
  const { toggleAction } = useContext(ActionContext);
  const [input, setInput] = useState<{
    question: string;
    answer: string;
    is_active: boolean;
  }>({
    question,
    answer,
    is_active,
  });

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setInput((prev) => ({
      ...prev,
      is_active: !prev.is_active,
    }));
  };

  const handleSubmitEdit = async (e: FormEvent) => {
    e.preventDefault();
    // Initialize form data
    const formData = new FormData();
    formData.append('question', input.question);
    formData.append('answer', input.answer);
    formData.append('is_active', input.is_active ? '1' : '0');
    // Submit
    toggleAction();
    await patchFaq(id, formData);
    toggleAction();
    closeFn();
  };

  const handleSubmitCreate = async (e: FormEvent) => {
    e.preventDefault();
    // Initialize form data
    const formData = new FormData();
    formData.append('question', input.question);
    formData.append('answer', input.answer);
    // Submit
    toggleAction();
    await postFaq(formData);
    toggleAction();
    closeFn();
  };

  return (
    <Modal
      title={`${id ? 'Edit' : 'Create New'} FAQ`}
      isOpen={isOpen}
      close={closeFn}
    >
      <div style={{ width: '30rem' }}>
        <form action="" onSubmit={id ? handleSubmitEdit : handleSubmitCreate}>
          <div className="mb-3">
            <label htmlFor="question" className="form-label fw-medium">
              Question
            </label>
            <input
              type="text"
              defaultValue={question}
              className="form-control"
              id="question"
              name="question"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="answer" className="form-label fw-medium">
              Answer
            </label>
            <textarea
              id="answer"
              name="answer"
              cols={30}
              rows={8}
              defaultValue={answer}
              onChange={handleInput}
              className="form-control"
              style={{ resize: 'none' }}
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="is_active"
              name="is_active"
              onChange={handleCheckboxChange}
              checked={input.is_active}
            />
            <label className="form-check-label fw-medium" htmlFor="is_active">
              Is Active
            </label>
          </div>

          <div className="d-flex justify-content-center">
            {id ? (
              <button
                type="submit"
                className="btn btn-warning"
                style={{ width: 200 }}
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: 200 }}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

const Question: React.FC<FAQ> = ({ id, question, answer, is_active }) => {
  const { toggleAction } = useContext(ActionContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    const response = confirm('Sure you want to delete?');
    if (response) {
      toggleAction();
      await deleteFaq(id);
      toggleAction();
    }
  };

  return (
    <div>
      <div>
        <ModalAction
          id={id}
          question={question}
          answer={answer}
          is_active={is_active}
          isOpen={isModalOpen}
          closeFn={closeModal}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-100" style={{ marginRight: 20 }}>
          <QuestionAnswer question={question} answer={answer} />
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ minWidth: '90px' }}
        >
          <button className="btn btn-warning" onClick={openModal}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

function Main() {
  const [isActionActive, setIsActionActive] = useState(false);
  const [data, setData] = useState<PaginatedResponse<FAQ[]>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleAction = () => {
    setIsActionActive((prev) => !prev);
  };

  const nextPage = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (data?.previous) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      const responseData = await getFaqs(page);
      setData(responseData);
    };
    fetchFaqs();
  }, [page, isActionActive]);

  return (
    <ContentWrapper title="Frequently Asked Questions (FAQs)">
      <ActionContext.Provider value={{ toggleAction }}>
        <div>
          <ModalAction isOpen={isModalOpen} closeFn={closeModal} />
        </div>
        <div className="mb-4">
          <button className="button button-primary-blue" onClick={openModal}>
            <span style={{ fontSize: '14px' }}>+ Add Question</span>
          </button>
        </div>
        <div className="mb-3">
          <div className="mb-4">
            {data?.results.length > 0 &&
              data?.results.map((item) => {
                return (
                  <div key={item.id} className="mb-4">
                    <Question
                      id={item.id}
                      question={item.question}
                      answer={item.answer}
                      is_active={item.is_active}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex align-content-center">
            <button className="button button-square-light" onClick={prevPage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="mx-3" style={{ padding: '7px 0px' }}>
              <span>{page}</span>
            </div>
            <button className="button button-square-light" onClick={nextPage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </ActionContext.Provider>
    </ContentWrapper>
  );
}

export default Main;
