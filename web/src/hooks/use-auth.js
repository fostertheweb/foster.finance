import React, { useState, useEffect, useContext, createContext } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  function confirmSignUp(email, code) {
    setLoading(true);
    Auth.confirmSignUp(email, code)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setLoading(false));
  }

  function signIn(email, password) {
    setLoading(true);
    Auth.signIn(email, password)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setLoading(false));
  }

  function signUp(email, password) {
    setLoading(true);
    Auth.signUp(email, password)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setLoading(false));
  }

  function resendSignUp(email) {
    setLoading(true);
    Auth.resendSignUp(email)
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setLoading(false));
  }

  function signOut() {
    setLoading(true);
    Auth.signOut()
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setLoading(false));
  }

  function handleError(err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }

    setError(err);
  }

  function handleSuccess(response) {
    setError(null);

    if (process.env.NODE_ENV === "development") {
      console.log(response);
    }
  }

  function handleAuthChange({ payload: { event, data } }) {
    switch (event) {
      case "signIn":
        navigate("/me");
        setLoading(false);
        setError(null);
        break;
      case "signOut":
        setLoading(false);
        setError(null);
        setUser(null);
        navigate("/signin");
        break;
      case "signUp_failure":
      case "signIn_failure":
        handleError(data);
        break;
      default:
        console.log({ event, data });
        break;
    }
  }

  useEffect(() => {
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(handleError)
      .finally(() => setLoading(false));

    Hub.listen("auth", handleAuthChange);

    return () => Hub.remove("auth", handleAuthChange);
  }, []);

  return {
    loading,
    error,
    user,
    confirmSignUp,
    signIn,
    signUp,
    signOut,
    resendSignUp,
  };
}
