
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
 * After setting or changing it in .env.local, restart your development server.
 * For deployed environments, ensure this variable is set in the hosting provider's settings.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG_JSON;

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (
  !firebaseConfigString ||
  firebaseConfigString.trim() === '' ||
  firebaseConfigString.trim() === '""' || // Catches an empty JSON object string literal "{}".
  firebaseConfigString.trim() === "''" || // Catches an empty JSON object string literal '{}'.
  firebaseConfigString.trim() === '{}' // Catches an empty JSON object string literal {}.
) {
  console.error(
    "CRITICAL: Firebase configuration (`NEXT_PUBLIC_FIREBASE_CONFIG_JSON`) is missing, effectively empty, or not a valid JSON object string. " +
    "Firebase services (Authentication, Firestore) will NOT work. " +
    "Please ensure `NEXT_PUBLIC_FIREBASE_CONFIG_JSON` is correctly set in your " +
    ".env.local file (for local development) or in your hosting environment variables (for deployment) " +
    "with your Firebase project's configuration. " +
    "Refer to the instructions in src/lib/firebase.ts for details. Restart your server after changes."
  );
  // app, auth, db will remain undefined, leading to errors when Firebase services are used.
} else {
  try {
    const firebaseConfig = JSON.parse(firebaseConfigString);
    // Basic check for essential keys in a valid Firebase config
    if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
      throw new Error("Parsed Firebase config is missing essential keys (apiKey, authDomain, projectId).");
    }

    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error: any) {
    console.error(
      "CRITICAL: Failed to parse or initialize Firebase configuration. " +
      "Ensure NEXT_PUBLIC_FIREBASE_CONFIG_JSON is a valid, non-empty JSON string representing your Firebase config object. Error: ",
      error.message || error
    );
    // app, auth, db might remain undefined or partially initialized
  }
}

export { app, auth, db };
