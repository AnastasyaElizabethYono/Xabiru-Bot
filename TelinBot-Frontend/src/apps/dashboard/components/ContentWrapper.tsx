import React, { ReactNode } from 'react';

interface ContentWrapperProps {
  title?: string;
  children: ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ title, children }) => {
  const titledStyle = {
    padding: '1.5rem 2.5rem',
  };

  const untitledStyle = {
    padding: '1.5rem 1rem',
  };

  return (
    <div
      className="content-wrapper"
      style={title ? titledStyle : untitledStyle}
    >
      {title && <h4 className="content-wrapper-title">{title}</h4>}
      {children}
    </div>
  );
};

export default ContentWrapper;
