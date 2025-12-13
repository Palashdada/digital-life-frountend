import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Normal login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Normal register
  const register = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
      await updateProfile(res.user, { displayName }); // Save name
    });

  // Google login/register
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // user contains displayName & photoURL
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, loginWithGoogle, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
