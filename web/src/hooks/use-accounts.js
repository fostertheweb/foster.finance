import { useMutation, useQuery } from "react-query";
import Axios from "axios";
import { useCurrentSession } from "./use-amplify-auth";

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

export function useSaveAccounts() {
	const { data: session } = useCurrentSession();
	return useMutation(async (accounts) => {
		const { data } = await Axios.post(
			`${API_URL}/accounts`,
			{ accounts },
			{
				headers: {
					Authorization: session.idToken.jwtToken,
				},
			},
		);

		return data;
	});
}

export function useCreateLink() {
	const { data: session } = useCurrentSession();
	return useMutation(async (public_token) => {
		const { data } = await Axios.post(
			`${API_URL}/accounts/link`,
			{ public_token },
			{
				headers: {
					Authorization: session.idToken.jwtToken,
				},
			},
		);
		return data;
	});
}

export function useGetLinkToken() {
	const { data: session } = useCurrentSession();
	return useQuery(
		["linkToken", session?.idToken?.jwtToken],
		async () => {
			const { data } = await Axios.get(`${API_URL}/accounts/link`, {
				headers: {
					Authorization: session.idToken.jwtToken,
				},
			});
			console.log(data);
			return data;
		},
		{
			enabled: session,
		},
	);
}
