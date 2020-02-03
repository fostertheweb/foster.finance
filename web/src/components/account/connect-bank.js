import React from "react";
import PlaidLink from "react-plaid-link";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/pro-duotone-svg-icons";

const product = process.env.REACT_APP_PLAID_PRODUCT_SCOPE.split(",");
const env = process.env.REACT_APP_PLAID_ENVIRONMENT;
const publicKey = process.env.REACT_APP_PLAID_PUBLIC_KEY;

const EXCHANGE_PUBLIC_TOKEN = gql`
  mutation ExchangePublicToken($token: String!) {
    exchangePublicToken(token: $token) {
      access_token
    }
  }
`;

function handleSuccess(token) {
  localStorage.setItem("plaid_access_token", token);
}

function handleExit() {
  console.log("Plaid - handleExit");
}

export default function() {
  const [exchangePublicToken, { data }] = useMutation(EXCHANGE_PUBLIC_TOKEN);

  if (data) {
    handleSuccess(data.exchangePublicToken.access_token);
  }

  return (
    <PlaidLink
      style={{}}
      className="block border-2 rounded bg-gray-300 hover:bg-gray-200 cursor-pointer text-gray-700 border-gray-400 border-1 py-3 px-5"
      clientName="Outlay"
      env={env}
      product={product}
      publicKey={publicKey}
      onExit={handleExit}
      onSuccess={token => {
        exchangePublicToken({ variables: { token } });
      }}>
      <FontAwesomeIcon icon={faPiggyBank} size="lg" color="#666666" />
      <span className="ml-2 font-medium">Connect to Bank</span>
    </PlaidLink>
  );
}
