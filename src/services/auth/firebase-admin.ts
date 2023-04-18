import {
  initializeApp,
  applicationDefault,
  getApp,
  getApps,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdmin =
  getApps().length === 0
    ? initializeApp({
        credential: applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
    : getApp();

const auth = getAuth(firebaseAdmin);

export { firebaseAdmin, auth };
