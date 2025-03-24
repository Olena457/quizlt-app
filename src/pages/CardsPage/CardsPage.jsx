import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards } from '../../redux/createCard/operationsCreateCard.js';
import {
  selectCreateCardData,
  selectCreateCardLoading,
} from '../../redux/createCard/selectorsCreateCard.js';
import Loader from '../../components/Loader/Loader.jsx';
import CardsListGame from '../../components/CardsListGame/CardsListGame.jsx';
import { Outlet, useParams } from 'react-router-dom';
import css from './CardsPage.module.css';

const CardsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const cards = useSelector(selectCreateCardData);
  const loading = useSelector(selectCreateCardLoading);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const card = useMemo(() => cards.find(card => card.id === id), [cards, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : cards.length > 0 ? (
        <div className={css.wrapperCard}>
          <CardsListGame cards={cards} />
          <Outlet context={{ card }} />
        </div>
      ) : (
        <div className={css.wrapperNoEvent}>
          <h4 className={css.title}>Quiz card no found</h4>
        </div>
      )}
    </>
  );
};

export default CardsPage;
