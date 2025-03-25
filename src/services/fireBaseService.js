import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';

export const fetchCardsByCategory = async category => {
  try {
    const database = getDatabase();
    const cardsRef = ref(database, 'cards');
    const categoryQuery = query(
      cardsRef,
      orderByChild('category'),
      equalTo(category)
    );
    const snapshot = await get(categoryQuery);

    const filteredCards = [];
    snapshot.forEach(childSnapshot => {
      filteredCards.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    return filteredCards;
  } catch (error) {
    console.error('Error fetching cards by category:', error);
  }
};
