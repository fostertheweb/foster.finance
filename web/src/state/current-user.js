import { atom, selector } from "recoil";

export const currentUserAtom = atom({
	key: "foster.finance.currentUser",
	default: null,
});

export const currentUserIdSelector = selector({
	key: "foster.finance.currentUserId",
	get: ({ get }) => {
		const currentUser = get(currentUserAtom);

		if (currentUser) {
			return currentUser.attributes.sub;
		}

		return null;
	},
});

export const currentUserAccessTokenSelector = selector({
	key: "foster.finance.currentUserAccessToken",
	get: ({ get }) => {
		const currentUser = get(currentUserAtom);

		if (currentUser) {
			return currentUser.signInUserSession.idToken.jwtToken;
		}

		return null;
	},
});

export const currentUserRefreshTokenSelector = selector({
	key: "foster.finance.currentUserRefreshToken",
	get: ({ get }) => {
		const currentUser = get(currentUserAtom);

		if (currentUser) {
			return currentUser.signInUserSession.refreshToken.token;
		}

		return null;
	},
});
