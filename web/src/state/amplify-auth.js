import { selector } from "recoil";
import { AmplifyAuth } from "../lib/amplify-auth";

export const currentUserSelector = selector({
	key: "foster.finance.currentUser",
	get: async () => {
		try {
			return await AmplifyAuth.currentAuthenticatedUser();
		} catch (err) {
			return null;
		}
	},
});

export const currentUserIdAtom = selector({
	key: "foster.finance.currentUserId",
	get: ({ get }) => {
		const currentUser = get(currentUserSelector);

		if (currentUser) {
			return currentUser.attributes.sub;
		}

		return null;
	},
});

export const currentUserAccessTokenSelector = selector({
	key: "foster.finance.currentUserAccessToken",
	get: ({ get }) => {
		const currentUser = get(currentUserSelector);

		if (currentUser) {
			return currentUser.signInUserSession.idToken.jwtToken;
		}

		return null;
	},
});
