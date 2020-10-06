import Amplify, { Auth } from "aws-amplify";
import { useMutation, useQuery, useQueryCache } from "react-query";

Amplify.configure({
	Auth: {
		region: process.env.REACT_APP_AWS_REGION,
		userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
		mandatorySignIn: false,
	},
});

export function useCurrentUser() {
	return useQuery("currentUser", () => Auth.currentAuthenticatedUser());
}

export function useCurrentSession() {
	return useQuery("currentSession", () => Auth.currentSession());
}

export function useSignOut() {
	const queryCache = useQueryCache();
	return useMutation(() => Auth.signOut(), {
		onSuccess() {
			queryCache.setQueryData("currentUser", () => undefined);
		},
	});
}

export function useSignIn() {
	const queryCache = useQueryCache();
	return useMutation(({ email, password }) => Auth.signIn(email, password), {
		onSuccess() {
			queryCache.refetchQueries("currentUser");
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
