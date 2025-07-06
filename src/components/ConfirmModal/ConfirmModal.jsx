import css from './ConfirmModal.module.css';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <p className={css.message}>{message}</p>
        <div className={css.actions}>
          <button className={css.confirm} onClick={onConfirm}>
            Yes
          </button>
          <button className={css.cancel} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
