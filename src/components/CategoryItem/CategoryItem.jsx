import css from './CategoryItem.module.css';

const CategoryItem = ({ title, onSelect, icon }) => {
  return (
    <button className={css.categoryButton} onClick={() => onSelect(title)}>
      <img src={icon} alt={`${title} icon`} width="40" height="40" />
      {title}
    </button>
  );
};

export default CategoryItem;
