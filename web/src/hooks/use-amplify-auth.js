import Amplify, { Auth } from "aws-amplify";
import { useMutation, useQuery } from "react-query";

Amplify.configure({
	Auth: {
		region: process.env.REACT_APP_AWS_REGION,
		userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
		mandatorySignIn: false,
	},
});

export function useCurrentSession() {
	return useQuery(Auth.currentSession);
}

export function useSignOut() {
	return useMutation(Auth.signOut);
}

export function useSignIn() {
	return useMutation(Auth.signIn);
}
