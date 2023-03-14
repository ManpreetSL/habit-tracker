import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { auth } from './firebase';

const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => Promise.reject(error));

const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      return user;
    })
    .catch((error) => Promise.reject(error));

const signOut = () =>
  signOutFirebase(auth).catch((error) => console.error(error));

export { signUp, signIn, signOut };
