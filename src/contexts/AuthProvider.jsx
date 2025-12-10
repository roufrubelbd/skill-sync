import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../pages/Auth/firebase.config";
import { AuthContext } from "./AuthContext";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    googleLogin,
    createUser,
    loginUser,
    resetPassword,
    logOutUser,
    theme,
    setTheme,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// import { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import axios from "axios";
// import { auth } from "../pages/Auth/firebase.config";
// import { AuthContext } from "./AuthContext";
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [dbUser, setDbUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const googleProvider = new GoogleAuthProvider();

//   //  GOOGLE LOGIN
//   const googleLogin = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   //  CREATE USER
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   //  LOGIN
//   const loginUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   //  RESET PASSWORD
//   const resetPassword = (email) => {
//     setLoading(true);
//     return sendPasswordResetEmail(auth, email);
//   };

//   //  LOGOUT
//   const logOutUser = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   //  FETCH USER FROM MONGODB (Premium Status)
//   const refetchDbUser = async (email) => {
//     if (!email) return;

//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/users/${email}/role`
//       );

//       setDbUser({
//         email,
//         role: res.data.role,
//         isPremium: res.data.isPremium,
//       });
//     } catch (error) {
//       console.error("DB User Fetch Failed:", error);
//     }
//   };

//   //  FIREBASE AUTH STATE LISTENER
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);

//       if (currentUser?.email) {
//         await refetchDbUser(currentUser.email);
//       } else {
//         setDbUser(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   //  EXPORT EVERYTHING
//   const authInfo = {
//     user,
//     setUser,
//     dbUser,
//     loading,
//     setLoading,
//     googleLogin,
//     createUser,
//     loginUser,
//     resetPassword,
//     logOutUser,
//     refetchDbUser,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;
