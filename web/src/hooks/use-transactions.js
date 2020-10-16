import { useQuery } from "react-query";
import Axios from "axios";
import { useCurrentSession } from "hooks/use-amplify-auth";

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

export function useTransactions(start_date, end_date) {
	const { data: session } = useCurrentSession();
	return useQuery(
		["transactions", start_date, end_date, session?.idToken?.jwtToken],
		async () => {
			const { data } = await Axios.get(`${API_URL}/transactions`, {
				params: {
					start_date,
					end_date,
				},
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
