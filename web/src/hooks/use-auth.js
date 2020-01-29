import React, { useState, useEffect, useContext, createContext } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import { Machine, send } from "xstate";
import { useMachine } from "@xstate/react";

const authMachine = Machine({
  id: "auth",
});

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

  function confirmSignUp(email, code) {
    return Auth.confirmSignUp(email, code)
      .then(() => {
        return true;
      })
      .catch(handleError);
  }

  function signIn(email, password) {
    setLoading(true);
    return Auth.signIn(email, password)
      .then(() => send("SIGN_IN"))
      .catch(handleError)
      .finally(() => setLoading(false));
  }

  function signUp(email, password) {
    return Auth.signUp(email, password)
      .then(user => {
        console.log({ response: user });
      })
      .catch(handleError);
  }

  function resendSignUp(email) {
    return Auth.resendSignUp(email)
      .then(() => true)
      .catch(handleError);
  }

  function signOut() {
    return Auth.signOut()
      .then(response => {
        console.log({ response });
      })
      .catch(handleError);
  }

  function handleError(err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }

    setError(err);
  }

  function handleAuthChange({ payload: { event, data } }) {
    switch (event) {
      case "signUp":
      case "signIn":
        break;
      case "signUp_failure":
      case "signIn_failure":
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(handleError);

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
