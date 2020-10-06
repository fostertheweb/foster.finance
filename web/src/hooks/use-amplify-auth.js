import Amplify, { Auth } from "aws-amplify";
import { useMutation, useQuery } from "react-query";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

Amplify.configure({
	Auth: {
		region: process.env.REACT_APP_AWS_REGION,
		userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
		mandatorySignIn: false,
	},
});

const isAuthenticatedState = atom({
	key: "ff.isAuthenticated",
	default: false,
});

export function useIsAuthenticated() {
	return useRecoilValue(isAuthenticatedState);
}

export function useSetIsAuthenticated() {
	return useSetRecoilState(isAuthenticatedState);
}

export function useCurrentSession() {
	return useQuery(Auth.currentSession);
}

export function useSignOut() {
	const setIsAuthenticated = useSetIsAuthenticated();
	return useMutation(() => Auth.signOut(), {
		onSuccess() {
			setIsAuthenticated(false);
		},
	});
}

export function useSignIn() {
	const setIsAuthenticated = useSetIsAuthenticated();
	return useMutation(({ email, password }) => Auth.signIn(email, password), {
		onSuccess() {
			setIsAuthenticated(true);
		},
	});
}

export function useSignUp() {
	return useMutation(({ email, password }) => Auth.signUp(email, password));
}

export function useResendSignUp() {
	return useMutation(({ email }) => Auth.resendSignUp(email));
}

export function useConfirmSignUp() {
	return useMutation(({ email, code }) => Auth.confirmSignUp(email, code));
}
