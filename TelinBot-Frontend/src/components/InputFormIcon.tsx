import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface InputFormIconProps {
  type: string;
  id: string;
  placeholder?: string;
  icon: IconDefinition;
}

function InputFormIcon({
  type,
  id,
  placeholder = '',
  icon,
}: Readonly<InputFormIconProps>) {
  return (
    <div className="input-with-icon">
      <FontAwesomeIcon icon={icon} className="form-control-icon" />
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
}

export default InputFormIcon;
