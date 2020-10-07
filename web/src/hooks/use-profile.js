import { useMutation, useQuery } from "react-query";
import Axios from "axios";
import { useCurrentSession } from "./use-amplify-auth";

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

export function useCreateProfile() {
	const { data: session } = useCurrentSession();
	return useMutation(async (profile) => {
		const { data } = await Axios.post(`${API_URL}/profile`, profile, {
			headers: {
				Authorization: session.idToken.jwtToken,
			},
		});

		return data;
	});
}

export function useGetProfile() {
	const { data: session } = useCurrentSession();
	return useQuery(
		["profile", session],
		async () => {
			const { data } = await Axios.get(`${API_URL}/profile`, {
				headers: {
					Authorization: session.idToken.jwtToken,
				},
			});
			return data;
		},
		{ enabled: session, retry: false },
	);
}
