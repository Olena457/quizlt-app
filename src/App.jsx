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

const CardFormPage = lazy(() =>
  import('./pages/CardFormPage/CardFormPage.jsx')
);
const CardsPage = lazy(() => import('./pages/CardsPage/CardsPage.jsx'));
const CreateCardPage = lazy(() =>
  import('./pages/CreateCardPage/CreateCardPage.jsx')
);
const FavoriteCardPage = lazy(() =>
  import('./pages/FavoriteCardPage/FavoriteCardPage.jsx')
);
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage.jsx')
);
const LogInPage = lazy(() => import('./pages/LogInPage/LogInPage.jsx'));
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
            <Route path="/create-card" element={<CreateCardPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/cards/:id/register" element={<CardFormPage />} />
            <Route
              path="/cards/:id/participants"
              element={<ViewPlayersPage />}
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute redirectTo="/" component={<FavoriteCardPage />} />
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
