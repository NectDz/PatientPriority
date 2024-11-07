// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase-config"; // Import Firebase auth
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// const AuthContext = createContext();

// //hook
// export const useAuth = () => useContext(AuthContext);

// //AuthProvider component to wrap and provide authentication state
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   //firebase listener for authentication state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   //login
//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   //logout
//   const logout = () => {
//     return signOut(auth);
//   };

//   //currentUser, login, and logout functions to all components
//   const value = {
//     currentUser,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children} {/* Only render app if not loading */}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext();

//hook
export const useAuth = () => useContext(AuthContext);

//AuthProvider component to wrap and provide authentication state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
   // create new state called "userRole" to keep track if user is doctor or patient
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  //firebase listener for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Current user:", user);
      setCurrentUser(user);
  
      if (user) {
        // console.log("User is authenticated, UID:", user.uid);  // for debugging 
        try {
          // look through the "doctor" collection and find where id matches user.uid
          const doctorQuery = query(
            collection(db, "doctor"),
            where("id", "==", user.uid)
          );
  
          // look through the "patients" collection and find where id matches user.uid
          const patientQuery = query(
            collection(db, "patients"),
            where("id", "==", user.uid)
          );
  
          // debugging
          console.log("Checking for user with ID:", user.uid);
  
          const [doctorSnapshot, patientSnapshot] = await Promise.all([
            getDocs(doctorQuery),
            getDocs(patientQuery)
          ]);
  
          // debugging
          console.log("Doctor documents found:", !doctorSnapshot.empty);
          console.log("Patient documents found:", !patientSnapshot.empty);
  
          if (!doctorSnapshot.empty) {
            // debugging
            console.log("User is a doctor");
            const doctorData = doctorSnapshot.docs[0].data();
            setUserRole({
              type: "doctor",
              data: doctorData
            });
          } else if (!patientSnapshot.empty) {
            // debugging
            console.log("User is a patient");
            const patientData = patientSnapshot.docs[0].data();
            setUserRole({
              type: "patient",
              data: patientData
            });
          } else {
            // debugging
            console.log("No role found for user with ID:", user.uid);
            console.log("Checking patients collection query:", patientQuery);
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
        }
      } else {
        console.log("User is not logged in");
        setUserRole(null);
      }
  
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
    userRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
