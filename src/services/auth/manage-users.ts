import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      console.log('user', user);
      return user;
    })
    .catch((error) => {
      // const { code, message } = error;
      console.error('Sign up error:', error);
      return error;
    });

const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      return user;
    })
    .catch((error) => {
      console.error('Sign in error:', error);
      return null;
    });

export { signUp, signIn };
