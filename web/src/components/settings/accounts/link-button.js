import React, { useState } from "react";
import PlaidLink from "react-plaid-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank, faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import { useAuth } from "../../../hooks/use-auth";
import { buttonStyle, primary } from "../../button";

const url = process.env.REACT_APP_API_ENDPOINT;
const product = process.env.REACT_APP_PLAID_PRODUCT_SCOPE.split(",");
const env = process.env.REACT_APP_PLAID_ENVIRONMENT;
const publicKey = process.env.REACT_APP_PLAID_PUBLIC_KEY;

export default function(props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSuccess(token) {
    setLoading(true);

    try {
      const uid = user.attributes.sub;
      const items = JSON.parse(localStorage.getItem(uid)) || [];
      const response = await fetch(`${url}/plaid/exchange`, {
        method: "POST",
        body: JSON.stringify({ public_token: token }),
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
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PlaidLink
      style={{}}
      className={buttonStyle + " py-2 px-4 " + primary}
      clientName="foster finance"
      env={env}
      product={product}
      publicKey={publicKey}
      onExit={() => null}
      onSuccess={token => handleSuccess(token)}>
      <FontAwesomeIcon icon={loading ? faSpinnerThird : faPiggyBank} spin={loading} size="lg" />
      <span className="ml-2 font-medium">
        {error ? error.message : props.text || "Link Bank Account"}
      </span>
    </PlaidLink>
  );
}
