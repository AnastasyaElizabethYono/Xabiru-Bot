import Modal from '@/components/Modal';
import { deleteFinanceReport, patchFinanceReport } from '@/services/finance';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useContext, useState } from 'react';
import { ActionContext } from '../hooks/ActionContext';

const EditFile: React.FC<{
  id: number | undefined;
  year: number;
  q: number;
}> = ({ id, year, q }) => {
  const context = useContext(ActionContext);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Check if files exist and take the first one
    const file = event.target.files ? event.target.files[0] : undefined;
    setFile(file);
  };

  const handleFileDelete = async () => {
    const response = confirm(`Delete Finance Report Q${q} ${year}?`);
    if (response) {
      context?.toggleAction();
      await deleteFinanceReport(id);
      context?.toggleAction();
    }
  };

  const uploadFinance = async (id: number, file: string) => {
    const formData = new FormData();
    formData.append('file', file);

    await patchFinanceReport(id, formData);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (file) {
      context?.toggleAction();
      await uploadFinance(id, file);
      context?.toggleAction();
      closeModal();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between" style={{ width: 85 }}>
        <button
          className="btn btn-warning btn-icon d-flex justify-content-center align-items-center"
          style={{ padding: '5px 8.7px' }}
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faEdit} fontSize={20} />
        </button>
        <button
          className="btn btn-danger btn-icon d-flex justify-content-center align-items-center"
          style={{ padding: '5px 8.7px' }}
          onClick={handleFileDelete}
        >
          <FontAwesomeIcon icon={faTrash} fontSize={20} />
        </button>
      </div>

      <Modal
        title={`Update file Q${q} ${year}`}
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
          <button type="submit" className="btn btn-warning">
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditFile;
