import React from "react";
import PlaidLink from "react-plaid-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/pro-duotone-svg-icons";

const product = process.env.REACT_APP_PLAID_PRODUCT_SCOPE.split(",");
const env = process.env.REACT_APP_PLAID_ENVIRONMENT;
const publicKey = process.env.REACT_APP_PLAID_PUBLIC_KEY;

export default function({ onSuccess }) {
  return (
    <PlaidLink
      style={{}}
      className="block border-2 rounded bg-gray-300 hover:bg-gray-200 cursor-pointer text-gray-700 border-gray-400 border-1 py-3 px-5"
      clientName="Outlay"
      env={env}
      product={product}
      publicKey={publicKey}
      onExit={() => null}
      onSuccess={onSuccess}>
      <FontAwesomeIcon icon={faPiggyBank} size="lg" color="#666666" />
      <span className="ml-2 font-medium">Connect to Bank</span>
    </PlaidLink>
  );
}
