import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  value: string;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, handleInput }) => {
  return (
    <div className="d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={value}
        onChange={handleInput}
      />
      <button className="button" style={{ marginLeft: '8px' }}>
        <FontAwesomeIcon icon={faSearch} className="fs-4" />
      </button>
    </div>
  );
};

export default SearchBar;
