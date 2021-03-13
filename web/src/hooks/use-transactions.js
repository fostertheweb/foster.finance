import { useQuery } from "react-query";
import Axios from "axios";

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

export function useTransactions(start_date, end_date) {
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
