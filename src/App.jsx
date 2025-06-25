import 'modern-normalize';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase/firebaseConfig.js';
import { refreshUser } from './redux/auth/operationsAuth.js';
import { selectIsRefreshing } from './redux/auth/selectorsAuth.js';

import { ToastContainer } from 'react-toastify';
import Loader from './components/Loader/Loader.jsx';
import Layout from './components/Layout/Layout.jsx';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import './App.css';
import CategoryPage from './pages/CategoryPage/CategoryPage.jsx';
import ResultPage from './pages/ResultPage/ResultPage.jsx';

const CreateQuestionPage = lazy(() =>
  import('./pages/CreateQuestionPage/CreateQuestionPage.jsx')
);
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const StartPage = lazy(() => import('./pages/StartPage/StartPage.jsx'));
const GamePage = lazy(() => import('./pages/GamePage/GamePage.jsx'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage.jsx')
);
const LogInPage = lazy(() => import('./pages/LogInPage/LogInPage.jsx'));
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx')
);
// const ViewPlayersPage = lazy(() =>
//   import('./pages/ViewPlayersPage/ViewPlayersPage.jsx')
// );

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(refreshUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/result" element={<ResultPage />} />

            {/* <Route
              path="/view-players"
              path="players/:id"
              element={
                <PrivateRoute redirectTo="/" component={<ViewPlayersPage />} />
              }
            /> */}

            <Route
              path="/create-question"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<CreateQuestionPage />}
                />
              }
            />
            <Route
              path="/edit-question/:category/:id"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<CreateQuestionPage />}
                />
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
