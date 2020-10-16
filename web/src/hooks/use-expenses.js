import { useMutation, useQuery } from "react-query";
import Axios from "axios";
import { useCurrentSession } from "hooks/use-amplify-auth";

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

export function useDiscoverExpenses() {
	const { data: session } = useCurrentSession();
	return useQuery(
		["discoverExpenses", session?.idToken?.jwtToken],
		async () => {
			const { data } = await Axios.get(`${API_URL}/expenses/discover`, {
				headers: {
					Authorization: session.idToken.jwtToken,
				},
			});
			return data;
		},
		{
			enabled: session,
		},
	);
}

export function useSaveExpenses() {
	const { data: session } = useCurrentSession();
	return useMutation(async (expenses) => {
		const { data } = await Axios.post(
			`${API_URL}/expenses`,
			{ expenses },
			{
				headers: {
					Authorization: session.idToken.jwtToken,
				},
			},
		);

		return data;
	});
}
