// TODO: state machine
import React, { useEffect, useContext, createContext } from "react";
import Amplify, { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { authMachine } from "../machines/auth";

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
  const navigate = useNavigate();
  const [state, send] = useMachine(authMachine, {
    services: {
      signIn: (_context, { email, password }) => Auth.signIn(email, password),
      signOut: () => Auth.signOut(),
      signUp: (_context, { email, password }) => Auth.signUp(email, password),
      resendSignUp: (_context, { email }) => Auth.resendSignUp(email),
      confirmSignUp: (_context, { email, code }) => Auth.confirmSignUp(email, code),
      currentUser: () => Auth.currentAuthenticatedUser(),
      currentSession: () => Auth.currentSession(),
    },
  });

  function signIn(email, password) {
    send("SIGN_IN", { email, password });
  }

  function signOut() {
    send("SIGN_OUT");
  }

  function signUp(email, password) {
    send("SIGN_UP", { email, password });
  }

  function resendSignUp(email) {
    send("RESEND_SIGN_UP", { email });
  }

  function confirmSignUp(email, code) {
    send("CONFIRM_USER", { email, code });
  }

  return { status: state, signIn, signOut, signUp, resendSignUp, confirmSignUp };
}
