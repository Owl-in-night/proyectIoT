import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebase'; // Importa la instancia de Firestore
import { doc, setDoc, updateDoc } from "firebase/firestore"; // Importa las funciones necesarias de Firestore
import { dataEncrypt } from '../utils/data-encrypt';
import { dataDecrypt } from '../utils/data-decrypt';
import { useNavigate, useLocation } from 'react-router-dom';

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const userStorage = window.localStorage.getItem("user");
  const [user, setUser] = useState(dataDecrypt(userStorage) || null);

  const signout = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        disabled: true,
        lastSignOutTime: new Date().toISOString(),
      });
    }
    return signOut(auth);
  };

  const SigninWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ hd: 'uvg.edu.gt' });

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const newUser = result.user;

      // Guardar el usuario en Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        email: newUser.email,
        uid: newUser.uid,
        displayName: newUser.displayName,
        lastSignInTime: new Date().toISOString(),
        disabled: false,
        photoURL: newUser.photoURL || '/Images/13.png', // Usar la foto de Google o la foto predeterminada
      });

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser) {
        const userDoc = doc(db, 'users', currentUser.uid);

        // Actualizar el campo lastSignInTime cuando el usuario inicia sesión
        await setDoc(userDoc, { lastSignInTime: new Date().toISOString(), disabled: false }, { merge: true });

        if (location.pathname === '/') {
          navigate('/app');
        }
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  useEffect(() => {
    window.localStorage.setItem("user", dataEncrypt(user));
  }, [user]);

  return (
    <authContext.Provider value={{ signup, signin, user, signout, loading, SigninWithGoogle, resetPassword }}>
      {children}
    </authContext.Provider>
  );
}
