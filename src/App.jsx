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
const CardFormPage = lazy(() =>
  import('./pages/CardFormPage/CardFormPage.jsx')
);
const CardsPage = lazy(() => import('./pages/CardsPage/CardsPage.jsx'));
const CreateCardPage = lazy(() =>
  import('./pages/CreateCardPage/CreateCardPage.jsx')
);
// const FavoriteCardPage = lazy(() =>
//   import('./pages/FavoriteCardPage/FavoriteCardPage.jsx')
// );
import GamePage from './pages/GamePage/GamePage.jsx';
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage.jsx')
);
const LogInPage = lazy(() => import('./pages/LogInPage/LogInPage.jsx'));
// const FilterPage = lazy(() => import('./pages/FilterPage/FilterPage.jsx'));
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx')
);
const ViewPlayersPage = lazy(() =>
  import('./pages/ViewPlayersPage/ViewPlayersPage.jsx')
);

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
            <Route path="/register-user" element={<RegistrationPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/result" element={<ResultPage />} />

            <Route path="/create-card" element={<CreateCardPage />} />
            {/* <Route path="/cards" element={<CardsPage />} /> */}
            <Route path="/cards/:id" element={<CardFormPage />} />
            {/* <Route path="/filter" element={<FilterPage />} /> */}
            <Route path="/cards/:id/players" element={<ViewPlayersPage />} />

            {/* <Route
              path="/favorites"
              element={
                <PrivateRoute redirectTo="/" component={<FavoriteCardPage />} />
              }
            /> */}

            <Route
              path="/create-card"
              element={
                <PrivateRoute redirectTo="/" component={<CreateCardPage />} />
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
