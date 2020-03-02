import React, { useState } from "react";
import PlaidLink from "react-plaid-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank, faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import { useAuth } from "../../../hooks/use-auth";

const url = process.env.REACT_APP_API_ENDPOINT;
const product = process.env.REACT_APP_PLAID_PRODUCT_SCOPE.split(",");
const env = process.env.REACT_APP_PLAID_ENVIRONMENT;
const publicKey = process.env.REACT_APP_PLAID_PUBLIC_KEY;

export default function() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSuccess(token) {
    setLoading(true);
    const uid = user.attributes.sub;
    const items = JSON.parse(localStorage.getItem(uid)) || [];
    const response = await fetch(`${url}/plaid/exchange`, {
      method: "POST",
      body: { public_token: token },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { item_id, access_token } = await response.json();
    localStorage.setItem(
      uid,
      JSON.stringify([
        ...items,
        {
          item_id,
          access_token,
          public_token: token,
        },
      ]),
    );
    setLoading(false);
  }

  return (
    <PlaidLink
      style={{}}
      className="block border-2 rounded bg-gray-300 hover:bg-gray-200 cursor-pointer text-gray-700 border-gray-400 border-1 py-3 px-5"
      clientName="foster finance"
      env={env}
      product={product}
      publicKey={publicKey}
      onExit={() => null}
      onSuccess={token => handleSuccess(token)}>
      <FontAwesomeIcon
        icon={loading ? faSpinnerThird : faPiggyBank}
        spin={loading}
        size="lg"
        color="#666666"
      />
      <span className="ml-2 font-medium">Connect to Bank</span>
    </PlaidLink>
  );
}
