import { currentUserAtom } from "state/current-user";
import { useSetRecoilState } from "recoil";
import Amplify, { Auth } from "aws-amplify";
import { useState } from "react";

Amplify.configure({
	Auth: {
		region: process.env.REACT_APP_AWS_REGION,
		userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
		mandatorySignIn: false,
	},
});

export function useCurrentUser() {
	return function () {
		Auth.currentSession().then(console.log).catch(console.error);
		Auth.currentAuthenticatedUser().then(console.log).catch(console.error);
	};
}

export function useSignOut() {
	return function () {
		return Auth.signOut()
			.then((user) => user)
			.catch((err) => err);
	};
}

export function useSignIn() {
	return function (email, password) {
		return Auth.signIn(email, password)
			.then((user) => user)
			.catch((err) => err);
	};
}
