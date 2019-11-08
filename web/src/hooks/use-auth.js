import React, { useState, useEffect, useContext, createContext } from "react";
import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: true,
  },
});

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    try {
      const user = await Auth.signIn(email, password);
      setUser(user);
      return user;
    } catch (err) {}
  }

  async function signUp(email, password) {
    try {
      return await Auth.signUp(email, password);
    } catch (err) {
      console.log(err);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      setUser(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signIn,
    signUp,
    signOut,
  };
}
