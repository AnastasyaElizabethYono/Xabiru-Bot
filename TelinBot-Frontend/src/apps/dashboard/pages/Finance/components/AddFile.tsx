import Modal from '@/components/Modal';
import { postFinanceReport } from '@/services/finance';
import { ChangeEvent, useContext, useState } from 'react';
import { ActionContext } from '../hooks/ActionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

interface AddFileProps {
  year: number;
  q: number;
}

const AddFile: React.FC<AddFileProps> = ({ year, q }) => {
  const context = useContext(ActionContext);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle the file change event
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;
    setFile(file);
  };

  const uploadFinance = async (year: string, q: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('q', q);
    formData.append('year', year);

    await postFinanceReport(formData);
  };

  // Handle the submission of the file
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    // Assuming `file`, `year`, `q`, and `closeModal` are defined in your component:
    if (file) {
      // Assume context is derived from useContext
      context?.toggleAction();
      await uploadFinance(year.toString(), q.toString(), file);
      context?.toggleAction();
      closeModal();
    }
  };

  return (
    <div>
      <Modal
        title={`Upload file to Q${q} ${year}`}
        isOpen={isModalOpen}
        close={closeModal}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center"
          style={{ width: 400 }}
        >
          <div className="form-group" style={{ marginRight: 20 }}>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
      <div className="d-flex justify-content-center" style={{ width: 85 }}>
        <button
          className="btn btn-primary btn-icon d-flex justify-content-center align-items-center"
          style={{ padding: '5px 10px' }}
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faFileUpload} fontSize={20} />
        </button>
      </div>
    </div>
  );
};

export default AddFile;
