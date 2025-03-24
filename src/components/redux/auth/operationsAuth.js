import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../../firebase/firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { get, ref, set } from 'firebase/database';

//____________________ Register a user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name }, thunkAPI) => {
    try {
      //_______________create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //___________________get user
      const user = userCredential.user;

      //_______________if success save userinfo
      if (user) {
        await set(ref(database, 'users/' + user.uid), {
          email: user.email,
          name: name,
          createdAt: new Date().toISOString(),
          // favorites: JSON.stringify([]),
          favorites: {},
        });
      }

      //______________save user to redux
      return { uid: user.uid, email: user.email, name };
    } catch (err) {
      let errMessage;

      const errorCode = err.code;

      switch (errorCode) {
        case 'auth/email-already-in-use':
          errMessage = 'This email is already in use!';
          break;

        default:
          errMessage = 'Error while registering user.';
          break;
      }
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//___________________login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      //__________create  user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //____________get user info
      const user = userCredential.user;

      if (user) {
        const userRef = ref(database, 'users/' + user.uid);

        //___________ get data from real time
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();

          //________________save userto redux
          return {
            uid: user.uid,
            email: user.email,
            name: userData.name,
          };
        } else {
          throw new Error('User data not found');
        }
      }
    } catch (err) {
      let errMessage;

      const errorCode = err.code;

      switch (errorCode) {
        case 'auth/invalid-credential':
          errMessage = 'Wrong email or password!';
          break;

        default:
          errMessage = 'Error login user.';
          break;
      }
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//_________logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//_________refresh user
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return thunkAPI.rejectWithValue('Is not authenticated');
      }

      const userRef = ref(database, 'users/' + user.uid);

      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        return {
          uid: user.uid,
          email: user.email,
          name: userData.name,
        };
      } else {
        throw new Error('Something went wrong. Try login again.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
