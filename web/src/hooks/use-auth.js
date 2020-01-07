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

  function confirmSignup(email, code) {
    setState({ ...state, loading: true });
    return Auth.confirmSignup(email, code)
      .then(user => {
        console.log({ response: user });
        setState({
          loading: false,
          error: null,
          data: user,
        });
        return user;
      })
      .catch(err => {
        setState({ loading: false, error: err, data: null });
        console.error(err);
      });
  }

  function signIn(email, password) {
    setState({ ...state, loading: true });
    return Auth.signIn(email, password)
      .then(user => {
        console.log({ response: user });
        setState({
          loading: false,
          error: null,
          data: user,
        });
        return user;
      })
      .catch(err => {
        setState({ loading: false, error: err, data: null });
        console.error(err);
      });
  }

  function signUp(email, password) {
    setState({ ...state, loading: true });
    return Auth.signUp(email, password)
      .then(user => {
        console.log({ response: user });
        setState({
          loading: false,
          error: null,
          data: user,
        });
        return user;
      })
      .catch(err => {
        setState({ loading: false, error: err, data: null });
        console.error(err);
      });
  }

  function resendSignUp(email) {
    return Auth.resendSignUp(email)
      .then(() => true)
      .catch(() => false);
  }

  function signOut() {
    setState({ ...state, loading: true });
    return Auth.signOut()
      .then(response => {
        setState({ loading: false, error: null, data: null });
        console.log({ response });
      })
      .catch(err => {
        setState({ loading: false, error: err, data: null });
        console.error(err);
      });
  }

  function handleAuthChange({ payload: { event, data } }) {
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
      .catch(err => {
        setState({ loading: false, error: err, data: null });
        console.log({ err });
      });

    Hub.listen("auth", handleAuthChange);

    return () => Hub.remove("auth", handleAuthChange);
  }, []);

  return {
    user: state,
    confirmSignup,
    signIn,
    signUp,
    signOut,
    resendSignUp,
  };
}
