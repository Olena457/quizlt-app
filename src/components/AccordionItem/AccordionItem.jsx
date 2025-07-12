import css from './AccordionItem.module.css';

const AccordionItem = ({ title, description, isOpen, onClick }) => {
  return (
    <div className={css.accordionItem}>
      <button
        onClick={onClick}
        className={css.titleButton}
        aria-expanded={isOpen}
        aria-controls={`desc-${title}`}
      >
        {title}
      </button>

      <div
        className={`${css.panel} ${isOpen ? css.open : ''}`}
        id={`desc-${title}`}
        aria-hidden={!isOpen}
      >
        <p className={css.ruleDescription}>{description}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
