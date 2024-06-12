import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditFile from './EditFile';
import AddFile from './AddFile';

interface FinanceReportProps {
  id?: number;
  year: number;
  q: number;
  title: string;
  file?: string;
}

const FinanceReport: React.FC<FinanceReportProps> = ({
  id,
  year,
  q,
  title,
  file,
}) => {
  return (
    <div className="d-flex align-items-center">
      <div
        className="finance-report-container w-100"
        style={{ marginRight: '1rem' }}
      >
        <h4>{title}</h4>
        {file ? (
          <a href={file} target="_blank">
            <FontAwesomeIcon icon={faFileDownload} className="icon" />
          </a>
        ) : (
          <p></p>
        )}
      </div>
      <div className="mx-3">
        {file ? (
          <EditFile id={id} year={year} q={q} />
        ) : (
          <AddFile year={year} q={q} />
        )}
      </div>
    </div>
  );
};

export default FinanceReport;
