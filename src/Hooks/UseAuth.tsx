import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";

interface AuthContextProps {
  currentUser: object | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return unsubscribe;
  }, []);

  async function initializeUser(user: any) {
    if (user) {
      console.log(user);
      setCurrentUser({ ...user });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }

    setIsLoading(false);
  }

  const value: AuthContextProps = {
    currentUser,
    isLoading,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("UseContext hook must be used within a AuthProvider");
  }

  return context;
};
