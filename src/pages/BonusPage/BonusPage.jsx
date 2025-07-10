// src/pages/BonusFactsPage/BonusFactsPage.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import css from './BonusPage.module.css';

const BonusPage = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch(
          'https://uselessfacts.jsph.pl/random.json?language=en'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFact(data.text);
      } catch (err) {
        console.error('Error fetching fact:', err);
        setError(err.message);
        toast.error('Failed to load fact.');
      } finally {
        setLoading(false);
      }
    };

    fetchFact();
  }, []);

  return (
    <div className={css.bonusFactsContainer}>
      <div className={css.bonusQuiz}>
        <h1 className={css.title}>
          Your bonus fact!&nbsp;
          Did you know this?
        </h1>
        {loading && <p className={css.loading}>Loading fact...</p>}
        {error && <p className={css.error}>Error: {error}</p>}
        {!loading && !error && !fact && <p>Failed to load fact.Try later.</p>}
        {!loading && !error && fact && <p className={css.factText}>{fact}</p>}
        <div className="bonusQuiz">
          <button
            onClick={() => navigate('/category')}
            className={css.backButton}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BonusPage;
