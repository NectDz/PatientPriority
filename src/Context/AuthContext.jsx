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

          // look through both, and assign value from doctorQuery to doctorSnapshot, same for patient
          const [doctorSnapshot, patientSnapshot] = await Promise.all([ // Promise.all runs both functions together instead of one after the other
            getDocs(doctorQuery),
            getDocs(patientQuery)
          ]);

          // debugging
          // console.log("Doctor documents found:", !doctorSnapshot.empty);
          // console.log("Patient documents found:", !patientSnapshot.empty);

          // Check which query returned results
          if (!doctorSnapshot.empty) {
            // console.log("User is a doctor"); // debugging
            const doctorData = doctorSnapshot.docs[0].data();
            setUserRole({
              type: "doctor",
              data: doctorData
            });
          } else if (!patientSnapshot.empty) {
            // console.log("User is a patient"); // debugging

            // go through the array of and get the first document (should be only one since filtering through uid), and get the data
            const patientData = patientSnapshot.docs[0].data();
            setUserRole({
              type: "patient", // set the role to patient
              data: patientData // give the state the patient data
            });
          } else {
            console.log("No role found for user");
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
