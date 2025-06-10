
/**
 * @fileOverview Firebase SDK initialization.
 *
 * IMPORTANT FOR NEW PROJECT SETUP:
 * This file initializes Firebase services for your application. When moving this project
 * to a new Firebase project, you MUST update the Firebase configuration.
 *
 * 1. Go to your new Firebase project's console.
 * 2. Navigate to Project settings > General tab.
 * 3. Under "Your apps", find or add your web app.
 * 4. Copy the `firebaseConfig` object provided by Firebase.
 * 5. Create a `.env.local` file in the root of your project (if it doesn't exist).
 * 6. In `.env.local`, set the `NEXT_PUBLIC_FIREBASE_CONFIG_JSON` variable to the
 *    JSON string of your new `firebaseConfig` object.
 *    Example:
 *    NEXT_PUBLIC_FIREBASE_CONFIG_JSON='{"apiKey":"AIza...","authDomain":"your-new-project.firebaseapp.com", ...}'
 *
 * The application will not function correctly with Firebase services (Auth, Firestore)
 * until this environment variable is correctly set with your new project's details.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG_JSON;

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!firebaseConfigString || firebaseConfigString.includes("your-new-project-id")) {
  console.error(
    "CRITICAL: Firebase configuration is missing or is a placeholder. " +
    "Firebase services (Authentication, Firestore) will NOT work. " +
    "Please ensure `NEXT_PUBLIC_FIREBASE_CONFIG_JSON` is correctly set in your " +
    ".env.local file with your new Firebase project's configuration. " +
    "Refer to the instructions in src/lib/firebase.ts for details."
  );
  // To prevent the app from crashing when these are accessed but not initialized,
  // you might assign them to null or a dummy object, but be aware that
  // any attempt to use them will fail. For now, they will be undefined,
  // and attempting to use them will likely lead to runtime errors,
  // which explicitly signals that the Firebase setup is incomplete.
} else {
  try {
    const firebaseConfig = JSON.parse(firebaseConfigString);
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error(
      "CRITICAL: Failed to parse or initialize Firebase configuration. " +
      "Ensure NEXT_PUBLIC_FIREBASE_CONFIG_JSON is a valid JSON string. Error: ",
      error
    );
  }
}

export { app, auth, db };
