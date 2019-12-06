import React, { useState, useEffect, useContext, createContext } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";

Amplify.configure({
  Auth: {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function signIn(email, password) {
    setLoading(true);
    return Auth.signIn(email, password)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  function signUp(email, password) {
    setLoading(true);
    return Auth.signUp(email, password)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  function signOut() {
    setLoading(true);
    return Auth.signOut()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  function handleAuthChange({ payload: { event, data } }) {
    switch (event) {
      case "signIn":
        setUser(data);
        setError(null);
        break;
      case "signIn_failure":
        setUser(null);
        setError(data);
        break;
      default:
        setUser(null);
        break;
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(err => {
        setError(err);
        setUser(null);
      });

    Hub.listen("auth", handleAuthChange);

    return () => Hub.remove("auth", handleAuthChange);
  }, []);

  return {
    error,
    loading,
    user,
    signIn,
    signUp,
    signOut,
  };
}
