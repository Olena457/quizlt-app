// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addCard,
//   editCard,
// } from '../../redux/createCard/operationsCreteCard.js';
// import { selectCardById } from '../../redux/createCard/selectorsCreateCard.js';
// import {
//   selectIsLoggedIn,
//   selectUserId,
// } from '../../redux/auth/selectorsAuth.js';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import css from './CreateCardForm.module.css';
// // ________________________________________
// // import { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import {
// //   addCustomCard,
// //   editCustomCard,
// // } from '../../redux/customCards/operationsCustomCards.js';
// // import { selectCustomCardById } from '../../redux/customCards/selectorsCustomCards.js';
// // import {
// //   selectIsLoggedIn,
// //   selectUserId,
// // } from '../../redux/auth/selectorsAuth.js';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import css from './CreateCardForm.module.css';

// // ________________________________________
// const CreateQuestionForm = () => {
//   // const { category, id } = useParams();
//   // const isEdit = Boolean(id); // true if edit

//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const userId = useSelector(selectUserId);
//   const cardToEdit = useSelector(state => selectCardById(state, id));
//   // const cardToEdit = useSelector(state =>
//   //   selectCustomCardById(state, category, id)
//   // );

//   const [category, setCategory] = useState('');
//   const [title, setTitle] = useState('');
//   const [questionText, setQuestionText] = useState('');
//   const [option1, setOption1] = useState('');
//   const [option2, setOption2] = useState('');
//   const [option3, setOption3] = useState('');
//   const [option4, setOption4] = useState('');
//   const [correctAnswer, setCorrectAnswer] = useState('');

//   useEffect(() => {
//     if (!isLoggedIn) {
//       toast.info('You must log in to access this feature!', {
//         position: 'top-center',
//         toastId: 'login-toast',
//       });
//       navigate('/login');
//     }
//   }, [isLoggedIn, navigate]);
//   // edit logic
//   useEffect(() => {
//     // if (isEdit && cardToEdit) {
//     if (id && cardToEdit) {
//       setCategory(cardToEdit.category);
//       setTitle(cardToEdit.title);
//       setQuestionText(cardToEdit.questionText);
//       setOption1(cardToEdit.options[0]);
//       setOption2(cardToEdit.options[1]);
//       setOption3(cardToEdit.options[2]);
//       setOption4(cardToEdit.options[3]);
//       setCorrectAnswer(cardToEdit.correctAnswer);
//     }
//   }, [id, cardToEdit]);
//   // }, [isEdit, cardToEdit]);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (
//       !category ||
//       !title ||
//       !questionText ||
//       !correctAnswer ||
//       !option1 ||
//       !option2 ||
//       !option3 ||
//       !option4
//     ) {
//       toast.error('All fields are required!', { position: 'top-center' });
//       return;
//     }

//     const cardData = {
//       category,
//       title,
//       questionText,
//       options: [option1, option2, option3, option4].map(opt => opt.toString()),
//       correctAnswer: correctAnswer.toString(),
//       creatorId: userId,
//     };

//     try {
//       if (id) {
//         // editing
//         await dispatch(editCard({ id, updatedCard: cardData })).unwrap();
//         toast.success('Card updated successfully!', { position: 'top-center' });
//       } else {
//         // creating
//         await dispatch(addCard(cardData)).unwrap();
//         toast.success('Card created successfully!', { position: 'top-center' });
//       }
//       navigate('/');
//     } catch {
//       toast.error('An error occurred. Please try again later.', {
//         position: 'top-center',
//       });
//     }
//   };
//   // try {
//   //   if (isEdit) {
//   //     await dispatch(
//   //       editCustomCard({
//   //         category,
//   //         id,
//   //         updatedCard: cardData,
//   //       })
//   //     ).unwrap();
//   //     toast.success('Card updated successfully!', { position: 'top-center' });
//   //   } else {
//   //     await dispatch(addCustomCard(cardData)).unwrap();
//   //     toast.success('Card created successfully!', { position: 'top-center' });
//   //   }
//   //   navigate('/');
//   // } catch {
//   //   toast.error('An error occurred. Please try again later.', {
//   //     position: 'top-center',
//   //   });
//   // }

//   // ______________________________________
//   return (
//     <form onSubmit={handleSubmit} className={css.formContainer}>
//       <h2 className={css.title}>
//         {id ? 'Edit Card Form' : 'Create Card Form'}
//       </h2>
//       {/* <h2>{isEdit ? 'Edit Card Form' : 'Create Card Form'}</h2> */}

//       <label className={css.label}>
//         Category:
//         <input
//           type="text"
//           value={category}
//           onChange={e => setCategory(e.target.value)}
//           className={css.input}
//         />
//       </label>

//       <label className={css.label}>
//         Title:
//         <input
//           type="text"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className={css.input}
//         />
//       </label>

//       <label className={css.label}>
//         Question:
//         <textarea
//           value={questionText}
//           onChange={e => setQuestionText(e.target.value)}
//           className={css.textarea}
//         />
//       </label>

//       <label className={css.label}>
//         Option 1:
//         <input
//           type="text"
//           value={option1}
//           onChange={e => setOption1(e.target.value)}
//           className={css.input}
//         />
//       </label>

//       <label className={css.label}>
//         Option 2:
//         <input
//           type="text"
//           value={option2}
//           onChange={e => setOption2(e.target.value)}
//           className={css.input}
//         />
//       </label>

//       <label className={css.label}>
//         Option 3:
//         <input
//           type="text"
//           value={option3}
//           onChange={e => setOption3(e.target.value)}
//           className={css.input}
//         />
//       </label>

//       <label className={css.label}>
//         Option 4:
//         <input
//           type="text"
//           value={option4}
//           onChange={e => setOption4(e.target.value)}
//           className={css.input}
//         />
//       </label>

//       <label className={css.label}>
//         Correct Answer:
//         <input
//           type="text"
//           value={correctAnswer}
//           onChange={e => setCorrectAnswer(e.target.value)}
//           className={css.input}
//         />
//       </label>

//       <button type="submit" className={css.submitBtn}>
//         {id ? 'Update Card' : 'Create Card'}
//       </button>
//     </form>
//   );
// };

// export default CreateQuestionForm;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// <--- ОНОВЛЕНІ ІМПОРТИ для роботи з customCards ---
import {
  addCustomCard,
  editCustomCard,
  fetchCustomCardById, // Для завантаження картки для редагування
} from '../../redux/customCards/operationsCustomCards.js';
import {
  selectSelectedCustomCard, // Селектор для отримання завантаженої картки
  selectCustomCardsLoading, // Для індикації завантаження/збереження
  selectCustomCardsError, // Для обробки помилок
  clearSelectedCustomCard, // Для очищення стану після редагування/створення
} from '../../redux/customCards/selectorsCustomCards.js';
// --------------------------------------------------

import {
  selectIsLoggedIn,
  selectUserId,
} from '../../redux/auth/selectorsAuth.js';

import css from './CreateCardForm.module.css';
// import { update } from 'firebase/database';

const CreateQuestionForm = () => {
  // Отримуємо category та id з URL. category потрібна для шляху до Firebase.
  const { category: urlCategory, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);

  // Отримуємо картку для редагування з Redux-стану customCards
  const cardToEdit = useSelector(selectSelectedCustomCard);
  const loading = useSelector(selectCustomCardsLoading);
  const error = useSelector(selectCustomCardsError);

  // Стан форми
  const [category, setCategory] = useState(urlCategory || ''); // Встановлюємо початкове значення з URL
  // Поле 'title' видалено, оскільки питання не мають окремого title у Firebase
  const [questionText, setQuestionText] = useState(''); // Відповідає полю 'question' у Firebase
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Ефект для перевірки авторизації та перенаправлення
  useEffect(() => {
    if (!isLoggedIn) {
      toast.info('Ви повинні увійти, щоб отримати доступ до цієї функції!', {
        position: 'top-center',
        toastId: 'login-toast',
      });
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Ефект для завантаження даних картки при редагуванні
  useEffect(() => {
    if (id && urlCategory) {
      // Якщо є ID та категорія в URL, завантажуємо картку
      dispatch(fetchCustomCardById({ category: urlCategory, id }));
    }
    // Очищаємо вибрану картку при розмонтуванні компонента
    return () => {
      dispatch(clearSelectedCustomCard());
    };
  }, [dispatch, id, urlCategory]);

  // Ефект для заповнення форми даними завантаженої картки (для редагування)
  useEffect(() => {
    // Перевіряємо, що картка завантажена і її ID відповідає ID з URL
    if (id && cardToEdit && cardToEdit.id === id) {
      setCategory(urlCategory); // Категорія береться з URL
      setQuestionText(cardToEdit.question || ''); // Поле 'question'
      setOption1(cardToEdit.options?.[0] || '');
      setOption2(cardToEdit.options?.[1] || '');
      setOption3(cardToEdit.options?.[2] || '');
      setOption4(cardToEdit.options?.[3] || '');
      setCorrectAnswer(cardToEdit.correctAnswer || '');
    }
  }, [id, cardToEdit, urlCategory]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Перевірка на заповненість усіх полів
    if (
      !category.trim() || // Додано .trim() для видалення пробілів
      !questionText.trim() ||
      !correctAnswer.trim() ||
      !option1.trim() ||
      !option2.trim() ||
      !option3.trim() ||
      !option4.trim()
    ) {
      toast.error('Усі поля обов`язкові!', { position: 'top-center' });
      return;
    }

    // Створюємо об'єкт даних питання, який відповідає структурі Firebase
    const cardData = {
      question: questionText.trim(), // 'question' замість 'questionText'
      options: [option1.trim(), option2.trim(), option3.trim(), option4.trim()], // Масив рядків
      correctAnswer: correctAnswer.trim(),
      createdBy: userId, // 'createdBy' замість 'creatorId'
    };

    try {
      if (id) {
        // Редагування існуючого питання
        await dispatch(
          editCustomCard({
            category: category.trim(), // Передаємо категорію
            id: id,
            updatedCard: cardData, // Передаємо оновлені дані
          })
        ).unwrap();
        toast.success('Питання оновлено успішно!', { position: 'top-center' });
      } else {
        // Створення нового питання
        await dispatch(
          addCustomCard({ ...cardData, category: category.trim() })
        ).unwrap(); // Передаємо category окремо
        toast.success('Питання створено успішно!', { position: 'top-center' });
      }
      navigate('/'); // Перенаправляємо на головну сторінку або сторінку категорій
    } catch (err) {
      toast.error(`Виникла помилка: ${err.message || 'Спробуйте ще раз.'}`, {
        position: 'top-center',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.formContainer}>
      <h2 className={css.title}>
        {id ? 'Редагувати Питання' : 'Створити Питання'}
      </h2>

      {/* Поле Category */}
      <label className={css.label}>
        Категорія:
        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className={css.input}
          // Якщо категорію не можна змінювати при редагуванні, додай readOnly={Boolean(id)}
          readOnly={Boolean(id)} // Робимо поле readOnly при редагуванні
        />
      </label>

      {/* Поле Title видалено, оскільки питання не мають окремого title у Firebase */}
      {/* <label className={css.label}>
        Title:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={css.input}
        />
      </label> */}

      <label className={css.label}>
        Питання:
        <textarea
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          className={css.textarea}
        />
      </label>

      <label className={css.label}>
        Варіант 1:
        <input
          type="text"
          value={option1}
          onChange={e => setOption1(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Варіант 2:
        <input
          type="text"
          value={option2}
          onChange={e => setOption2(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Варіант 3:
        <input
          type="text"
          value={option3}
          onChange={e => setOption3(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Варіант 4:
        <input
          type="text"
          value={option4}
          onChange={e => setOption4(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Правильна відповідь:
        <input
          type="text"
          value={correctAnswer}
          onChange={e => setCorrectAnswer(e.target.value)}
          className={css.input}
        />
      </label>

      <button type="submit" className={css.submitBtn} disabled={loading}>
        {loading
          ? id
            ? 'edit ...'
            : 'create...'
          : id
          ? 'update question'
          : 'create question'}
      </button>
      {loading && <p>Завантаження/Збереження...</p>}
      {error && <p className={css.errorMessage}>Помилка: {error}</p>}
    </form>
  );
};

export default CreateQuestionForm;
