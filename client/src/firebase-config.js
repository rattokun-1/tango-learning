/*
 * Firebase configuration boundary.
 * Keep this file separate when migrating to Firebase Authentication / Firestore.
 * TANGO works entirely offline when `enabled` is false or these values are empty.
 */
export const firebaseConfig = {
  enabled: false,
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const isFirebaseConfigured = () =>
  firebaseConfig.enabled && Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId);
