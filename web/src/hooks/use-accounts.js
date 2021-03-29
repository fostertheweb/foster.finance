import { useMutation, useQuery } from "react-query";
import Axios from "axios";
import { useLocalStorage } from "react-use";
import { request, gql } from "graphql-request";
import { ulid } from "ulid";

const { REACT_APP_API_ENDPOINT: API_URL } = process.env;
const ENDPOINT = API_URL + "/graphql";

export function useSaveAccounts() {
	return useMutation(async (accounts) => {
		const { data } = await Axios.post(`${API_URL}/accounts`, { accounts });

		return data;
	});
}

export function useAccountsLocal() {
	const [value, setValue] = useLocalStorage("ff.accounts", []);
	return { data: value, mutate: setValue };
}

export function useCreateLink() {
	return useMutation(async (public_token) => {
		const { exchangePublicToken: data } = await request(
			ENDPOINT,
			gql`
			mutation {
				exchangePublicToken(public_token: "${public_token}") {
					item_id
					access_token
				}
			}
			`,
		);

		return data;
	});
}

export function useGetLinkToken() {
	return useQuery("linkToken", async () => {
		const { getLink: data } = await request(
			ENDPOINT,
			gql`
				query {
					getLink(client_user_id: "${ulid()}") {
						link_token
					}
				}
			`,
		);
		return data;
	});
}
