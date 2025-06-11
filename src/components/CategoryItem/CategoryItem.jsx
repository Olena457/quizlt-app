import css from './CategoryItem.module.css';

const CategoryItem = ({ title, onSelect, icon }) => {
  return (
    <button className={css.categoryButton} onClick={() => onSelect(title)}>
      <img src={icon} alt={`${title} icon`} width="20" height="20" />
      {title}
    </button>
  );
};

export default CategoryItem;
