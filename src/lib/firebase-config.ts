
'use client';
import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-4083810550-1801e",
  "appId": "1:786076119549:web:1439c04560ef4c5a712994",
  "apiKey": "AIzaSyBBgclc_MYEv0S-7-bbyZHRHGLWS0JPOdE",
  "authDomain": "studio-4083810550-1801e.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "786076119549"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export default app;
