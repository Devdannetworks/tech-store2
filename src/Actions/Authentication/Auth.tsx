import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const handleCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredentials) => {
      const user = userCredentials.user;
      addDoc(collection(db, "users", user.uid), {
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.uid,
        date: serverTimestamp,
      });
    });
    return { userCredentials, error: null };
  } catch (error: any) {
    console.error(error);
    return { error: error.code };
  }
};

export const handleSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { userCredentials };
  } catch (error: any) {
    return { error };
  }
};

export const handleCreateUserWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      emailVerified: user.emailVerified,
      id: user.uid,
    });

    return { result: result, error: null };
  } catch (error: any) {
    return { result: null, error: error.code };
  }
};

export const handleLogOut = () => {
  return auth.signOut();
};
