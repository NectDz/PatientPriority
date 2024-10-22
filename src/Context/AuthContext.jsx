import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config"; // Import Firebase auth
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

//hook
export const useAuth = () => useContext(AuthContext);

//AuthProvider component to wrap and provide authentication state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //firebase listener for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); 
    });

    
    return () => unsubscribe();
  }, []);

  //login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logout = () => {
    return signOut(auth);
  };

  //currentUser, login, and logout functions to all components
  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render app if not loading */}
    </AuthContext.Provider>
  );
};
