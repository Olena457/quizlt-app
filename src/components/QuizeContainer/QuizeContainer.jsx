import css from './QuizeContainer.module.css';

const QuizeContainer = ({ children }) => {
  return <div className={css.gameContainerQuiz}>{children}</div>;
};

export default QuizeContainer;
