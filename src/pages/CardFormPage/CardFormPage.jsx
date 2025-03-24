import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../redux/cards/operationsCards.js';
import { selectCards } from '../../redux/cards/selectorsCards.js';
import PlayerForm from '../../components/PlayerForm/PlayerForm.jsx';
import css from './CardFormPage.module.css';

const CardFormPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const [card, setCard] = useState(null);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  useEffect(() => {
    const foundCard = cards.find(card => card.id === id);
    setCard(foundCard);
  }, [cards, id]);
  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <>
      <div className={css.formPage}>
        <div className={css.formContainer}>
          <PlayerForm card={card} />
        </div>
      </div>
    </>
  );
};

export default CardFormPage;
