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
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  function confirmSignUp(email, code) {
    return Auth.confirmSignUp(email, code)
      .then(user => {
        console.log({ response: user });
        return user;
      })
      .catch(handleError);
  }

  function signIn(email, password) {
    return Auth.signIn(email, password)
      .then(user => {
        console.log({ response: user });
        return user;
      })
      .catch(handleError);
  }

  function signUp(email, password) {
    return Auth.signUp(email, password)
      .then(user => {
        console.log({ response: user });
        return user;
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
    console.log({ err });
    setState({ data: null, loading: false, error: err });
  }

  function handleAuthChange({ payload: { event, data } }) {
    setState({ ...state, loading: true });
    switch (event) {
      case "signUp":
      case "signIn":
        console.log({ event, data });
        setState({ loading: false, error: null, data });
        break;
      case "signUp_failure":
      case "signIn_failure":
        console.log({ event, data });
        setState({ loading: false, error: data, data: null });
        break;
      default:
        console.log({ event, data });
        setState({ loading: false, error: null, data });
        break;
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setState({ loading: false, error: null, data: user });
        console.log({ user });
      })
      .catch(handleError);

    Hub.listen("auth", handleAuthChange);

    return () => Hub.remove("auth", handleAuthChange);
  });

  return {
    user: state,
    confirmSignUp,
    signIn,
    signUp,
    signOut,
    resendSignUp,
  };
}
