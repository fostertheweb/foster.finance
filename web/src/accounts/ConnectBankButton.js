import React from "react";
import PlaidLink from "react-plaid-link";
import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import { useMutation } from "@apollo/react-hooks";
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
      className={classNames(Classes.BUTTON, Classes.INTENT_PRIMARY, "bp3-icon-bank-account")}
      clientName="Outlay"
      env={env}
      product={product}
      publicKey={publicKey}
      onExit={handleExit}
      onSuccess={publicToken => {
        exchangePublicToken({ variables: { publicToken } });
      }}>
      Connect to Bank
    </PlaidLink>
  );
}
