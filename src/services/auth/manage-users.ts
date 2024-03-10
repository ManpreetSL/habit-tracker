import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  signInAnonymously as signInAnonymouslyFirebase,
} from 'firebase/auth';
import { auth } from './firebase';

import logger from '../logger';

const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );

const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const { user } = userCredential;
    return user;
  });

const signInAnonymously = () =>
  signInAnonymouslyFirebase(auth).then((userCredential) => {
    const { user } = userCredential;
    return user;
  });

const signOut = () =>
  signOutFirebase(auth).catch((error) => logger.error(error));

export { signUp, signIn, signOut, signInAnonymously };
