
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG_JSON;

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!firebaseConfigString) {
  console.warn(
    "Firebase config not found. Firebase services (Auth, Firestore) will not work. " +
    "Please set NEXT_PUBLIC_FIREBASE_CONFIG_JSON in your .env file."
  );
  // Provide dummy instances or handle accordingly if Firebase is optional
  // For now, we'll let it throw errors if used without config to highlight the issue.
} else {
  const firebaseConfig = JSON.parse(firebaseConfigString);
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db };
