import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface QuestionAnswerProps {
  question: string;
  answer: string;
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  question,
  answer,
}) => {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  const handleQuestionOpen = () => {
    setIsQuestionOpen(!isQuestionOpen);
  };
  return (
    <div className="faq-container">
      <button
        className={`faq-header button w-100 ${isQuestionOpen ? 'active' : ''}`}
        onClick={handleQuestionOpen}
      >
        <h5 className="faq-question">{question}</h5>
        <FontAwesomeIcon icon={isQuestionOpen ? faChevronDown : faChevronUp} />
      </button>
      <div className={`faq-content ${isQuestionOpen ? 'active' : ''}`}>
        <p className="faq-answer">{answer}</p>
      </div>
    </div>
  );
};

export default QuestionAnswer;
