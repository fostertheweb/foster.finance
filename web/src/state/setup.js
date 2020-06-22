import { selector } from "recoil";
import { currentUserIdSelector } from "./amplify-auth";

export const setupStatusSelector = selector({
	key: "foster.finance.setupStatus",
	get: async ({ get }) => {
		try {
			const currentUserId = get(currentUserIdSelector);

			if (currentUserId) {
				const response = await fetch("", {
					headers: {
						Authorization: "",
						"Content-Type": "application/json",
					},
					method: "GET",
				});

				if (response.ok) {
					return await response.json();
				}

				throw await response.json();
			}
		} catch (err) {
			return null;
		}
	},
});
