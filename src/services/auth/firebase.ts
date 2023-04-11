import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: 'dot-shift-9282e.appspot.com',
  messagingSenderId: '191554309432',
  appId: '1:191554309432:web:f6ae53ad44047ae75a85cd',
  measurementId: 'G-625MYGFPBL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics =
  app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, analytics };
