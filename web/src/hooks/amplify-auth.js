import { atom, selector, useRecoilValueLoadable } from "recoil";
import {
	currentSessionAtom,
	currentUserAccessTokenSelector,
	currentUserRefreshTokenSelector,
	currentUserAtom,
} from "atoms/current-user";
import Amplify, { Auth } from "aws-amplify";
import { useState, useEffect } from "react";

Amplify.configure({
	Auth: {
		region: process.env.REACT_APP_AWS_REGION,
		userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
		mandatorySignIn: false,
	},
});

// set recoil state instead and use this as base for shit
export function useAuth() {
	const setCurrentUser = useRecoilSetState(currentUserAtom);

	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then((user) => {
				setCurrentUser(user);
			})
			.catch((err) => {
				if (err === "not authenticated") {
					setCurrentUser(null);
				} else {
					console.error(err);
				}
			});

		// Hub.listen("auth", handleAuthChange);

		// return () => Hub.remove("auth", handleAuthChange);
		// eslint-disable-next-line
	}, []);

	return {};
}

export const isAuthenticatedSelector = selector({
	key: "foster.finance.isAuthenticated",
	get: async () => {
		return (await Auth.currentSession()).isValid();
	},
});

export function useSignOut() {
	return async function () {
		return await Auth.signOut();
	};
}

export function useSignIn() {
	return async function (email, password) {
		return Auth.signIn(email, password)
			.then((user) => user)
			.catch((err) => err);
	};
}
