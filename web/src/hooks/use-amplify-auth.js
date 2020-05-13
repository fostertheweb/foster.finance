import React, { useContext, createContext } from "react";
import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: true,
  },
});

const AmplifyAuthContext = createContext();

export function AmplifyAuthProvider({ children }) {
  const auth = useAmplifyAuthProvider();

  return <AmplifyAuthContext.Provider value={auth}>{children}</AmplifyAuthContext.Provider>;
}

export const useAmplifyAuth = () => {
  return useContext(AmplifyAuthContext);
};

function useAmplifyAuthProvider() {
  return Auth;
}
