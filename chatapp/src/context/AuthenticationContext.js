import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

// The creater User can be used inside every component
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  // Function that checks whether a user is logged in or not
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    // Cleanup function so there is no memory leakage
    return () => {
      unsub();
    };
  }, []);

  return (
    // CurrentUser is sent to every component of our application using Context API
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};