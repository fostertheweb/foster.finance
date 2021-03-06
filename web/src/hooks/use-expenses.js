import { useMutation } from "react-query";
import { useLocalStorage } from "react-use";
import Axios from "axios";

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;

export function useDiscoverExpenses() {
	return useMutation(async (accounts) => {
		const { data } = await Axios.post(`${API_URL}/expenses/discover`, { accounts });
		return data;
	});
}

export function useExpensesLocal() {
	const [value, setValue] = useLocalStorage("ff.expenses", []);
	return { data: value, mutate: setValue };
}

export function useSaveExpenses() {
	return useMutation(async (expenses) => {
		const { data } = await Axios.post(`${API_URL}/expenses`, { expenses });
		return data;
	});
}
