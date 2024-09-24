// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "../firebase-config"; // Ensure you have this config file set up

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Create the AuthContext
const AuthContext = createContext(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component to provide authentication state and actions
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Initially, no user is signed in
  const [loading, setLoading] = useState(true); // Loading state to manage the auth state check

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user in the state
      setLoading(false); // Stop loading when we have the user state
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true); // Set loading to true when signing in
    try {
      await signInWithPopup(auth, provider); // Sign in using a popup
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading after sign-in attempt
    }
  };

  // Sign out the current user
  const signOutUser = async () => {
    try {
      await signOut(auth); // Sign out the current user
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Value object containing the auth state and actions
  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    signOut: signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when not loading */}
    </AuthContext.Provider>
  );
};
