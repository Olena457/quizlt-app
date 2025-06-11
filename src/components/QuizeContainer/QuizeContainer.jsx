import css from './QuizeContainer.module.css';

const QuizeContainer = ({ children }) => {
  return <div className={css.quizeContainer}>{children}</div>;
};

export default QuizeContainer;
