import { selector } from "recoil";
import { currentUserIdAtom } from "./amplify-auth";

export const setupStatusSelector = selector({
	key: "foster.finance.setupStatus",
	get: async ({ get }) => {
		try {
			const currentUserId = get(currentUserIdAtom);

			if (currentUserId) {
			}
		} catch (err) {}
	},
});
