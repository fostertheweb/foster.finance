import { useMutation, useQuery } from "react-query";
import Axios from "axios";
import { useCurrentSession } from "hooks/use-amplify-auth";
import { useLocalStorage } from "react-use";

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

export function useAccountsLocal() {
	const [value, setValue] = useLocalStorage("ff.accounts", []);
	return { data: value, mutate: setValue };
}

export function useCreateLink() {
	return useMutation(async (public_token) => {
		const { data } = await Axios.post(`${API_URL}/accounts/link`, { public_token });
		return data;
	});
}

export function useGetLinkToken() {
	return useQuery("linkToken", async () => {
		const { data } = await Axios.get(`${API_URL}/accounts/link`);
		console.log(data);
		return data;
	});
}
