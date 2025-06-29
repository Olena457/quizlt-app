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

import {
  addCustomCard,
  editCustomCard,
  fetchCustomCardById,
} from '../../redux/custom/operationsCustomCards.js';
import {
  selectSelectedCustomCard,
  selectCustomCardsLoading,
  selectCustomCardsError,
  clearSelectedCustomCard,
} from '../../redux/custom/selectorsCustomCards.js';

import { selectUserId } from '../../redux/auth/selectorsAuth.js';

import css from './CreateCardForm.module.css';

const CreateQuestionForm = () => {
  const { category: urlCategory, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);

  //get card to edit from store
  const cardToEdit = useSelector(selectSelectedCustomCard);
  const loading = useSelector(selectCustomCardsLoading);
  const error = useSelector(selectCustomCardsError);

  const [category, setCategory] = useState(urlCategory || '');
  const [questionText, setQuestionText] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    if (id && urlCategory) {
      dispatch(fetchCustomCardById({ category: urlCategory, id }));
    }
    // return function cleanup
    return () => {
      dispatch(clearSelectedCustomCard());
    };
  }, [dispatch, id, urlCategory]);

  useEffect(() => {
    //check if we are in edit mode
    if (id && cardToEdit && cardToEdit.id === id) {
      setCategory(urlCategory);
      setQuestionText(cardToEdit.question || '');
      setOption1(cardToEdit.options?.[0] || '');
      setOption2(cardToEdit.options?.[1] || '');
      setOption3(cardToEdit.options?.[2] || '');
      setOption4(cardToEdit.options?.[3] || '');
      setCorrectAnswer(cardToEdit.correctAnswer || '');
    }
  }, [id, cardToEdit, urlCategory]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      !category.trim() || // added .trim()
      !questionText.trim() ||
      !correctAnswer.trim() ||
      !option1.trim() ||
      !option2.trim() ||
      !option3.trim() ||
      !option4.trim()
    ) {
      toast.error('All fields required!', { position: 'top-center' });
      return;
    }

    //create object for question
    const cardData = {
      question: questionText.trim(),
      options: [option1.trim(), option2.trim(), option3.trim(), option4.trim()],
      correctAnswer: correctAnswer.trim(),
      createdBy: userId,
    };

    try {
      if (id) {
        // edit logic
        await dispatch(
          editCustomCard({
            category: category.trim(),
            updatedCard: cardData, //udated data
          })
        ).unwrap();
        toast.success('Question updated successfully!', {
          position: 'top-center',
        });
      } else {
        // creted new question
        await dispatch(
          addCustomCard({ ...cardData, category: category.trim() })
        ).unwrap(); // pass category
        toast.success('Question created successfully!!', {
          position: 'top-center',
        });
      }
      navigate('/categories');
    } catch (err) {
      toast.error(`An error occured: ${err.message || 'Please try again.'}`, {
        position: 'top-center',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.formContainer}>
      <h2 className={css.title}>{id ? 'Edit question' : 'Create question'}</h2>

      <label className={css.label}>
        Category:
        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className={css.input}
          readOnly={Boolean(id)} // Category readOnly (editing)
        />
      </label>

      <label className={css.label}>
        Question:
        <textarea
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          className={css.textarea}
        />
      </label>

      <label className={css.label}>
        Option 1:
        <input
          type="text"
          value={option1}
          onChange={e => setOption1(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Option 2:
        <input
          type="text"
          value={option2}
          onChange={e => setOption2(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Option 3:
        <input
          type="text"
          value={option3}
          onChange={e => setOption3(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Option 4:
        <input
          type="text"
          value={option4}
          onChange={e => setOption4(e.target.value)}
          className={css.input}
        />
      </label>

      <label className={css.label}>
        Correct answer:
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
      {loading && <p>Loadin/Saving...</p>}
      {error && <p className={css.errorMessage}>Error: {error}</p>}
    </form>
  );
};

export default CreateQuestionForm;
