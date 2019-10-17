import React from "react";
import PlaidLink from "react-plaid-link";
import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const product = process.env.REACT_APP_PLAID_PRODUCT_SCOPE.split(",");
const env = process.env.REACT_APP_PLAID_ENVIRONMENT;
const publicKey = process.env.REACT_APP_PLAID_PUBLIC_KEY;

const EXCHANGE_PUBLIC_TOKEN = gql`
  mutation ExchangePublicToken($publicToken: String!) {
    exchangePublicToken(publicToken: $publicToken) {
      access_token
    }
  }
`;

const GET_ACCOUNTS = gql`
  {
    getAccounts {
      accounts {
        name
      }
    }
  }
`;

function handleSuccess(token) {
  localStorage.setItem("plaid_access_token", token);
}

function handleExit() {
  console.log("Plaid - handleExit");
}

export const getAccessToken = () => localStorage.getItem("plaid_access_token");

export function AccountsList() {
  const { data, loading, error } = useQuery(GET_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error</pre>;

  return (
    <ul>
      {data.getAccounts.accounts.map(account => (
        <li>{account.name}</li>
      ))}
    </ul>
  );
}

export function AddAccountButton() {
  const [exchangePublicToken, { data }] = useMutation(EXCHANGE_PUBLIC_TOKEN);

  if (data) {
    handleSuccess(data.exchangePublicToken.access_token);
  }

  return (
    <PlaidLink
      style={{}}
      className={classNames(Classes.BUTTON, Classes.INTENT_PRIMARY, "bp3-icon-add")}
      clientName="Outlay"
      env={env}
      product={product}
      publicKey={publicKey}
      onExit={handleExit}
      onSuccess={publicToken => {
        exchangePublicToken({ variables: { publicToken } });
      }}>
      Add Account
    </PlaidLink>
  );
}
