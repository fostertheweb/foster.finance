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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const navigate = useNavigate();

  function confirmSignUp(email, code) {
    setLoading(true);
    Auth.confirmSignUp(email, code)
      .then(handleSuccess)
      .catch(handleError);
  }

  function signIn(email, password) {
    setLoading(true);
    Auth.signIn(email, password)
      .then(user => {
        setUser(user);
        handleSuccess(user);
      })
      .catch(handleError);
  }

  function signUp(email, password) {
    setLoading(true);
    Auth.signUp(email, password)
      .then(handleSuccess)
      .catch(handleError);
  }

  function resendSignUp(email) {
    setLoading(true);
    Auth.resendSignUp(email)
      .then(handleSuccess)
      .catch(handleError);
  }

  function signOut() {
    setLoading(true);
    Auth.signOut()
      .then(handleSuccess)
      .catch(handleError);
  }

  function handleError(err) {
    setError(err);
    setUser(null);
    setLoading(false);

    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }
  }

  function handleSuccess(response) {
    setError(null);
    setLoading(false);

    if (process.env.NODE_ENV === "development") {
      console.log(response);
    }
  }

  function handleAuthChange({ payload: { event, data } }) {
    switch (event) {
      case "signIn":
        navigate("/app");
        break;
      case "signOut":
        setUser(null);
        navigate("/");
        break;
      case "signUp":
        setNewUser(data);
        navigate("/verify");
        break;
      default:
        console.log({ event, data });
        break;
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user);
        setLoading(false);
      })
      .catch(err => {
        if (err === "not authenticated") {
          setError(null);
          setUser(null);
          setLoading(false);
        } else {
          handleError(err);
        }
      });

    Hub.listen("auth", handleAuthChange);

    return () => Hub.remove("auth", handleAuthChange);
    // eslint-disable-next-line
  }, []);

  return {
    loading,
    error,
    user,
    newUser,
    confirmSignUp,
    signIn,
    signUp,
    signOut,
    resendSignUp,
  };
}
