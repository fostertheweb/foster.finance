import React from "react";
import { usePlaidLink } from "react-plaid-link";
import { faLock } from "@fortawesome/pro-duotone-svg-icons";
import Button from "../../button";
import Alert from "../../alert";

const product = process.env.REACT_APP_PLAID_PRODUCT_SCOPE.split(",");
const env = process.env.REACT_APP_PLAID_ENVIRONMENT;
const publicKey = process.env.REACT_APP_PLAID_PUBLIC_KEY;

const noOp = () => null;

export default function(props) {
  const config = {
    clientName: "foster finance",
    countryCodes: ["US"],
    language: "en",
    product,
    publicKey,
    env,
    onSuccess: props.onLinkSuccess,
    onError: console.error,
    onExit: props.onLinkExit || noOp,
  };

  const { open, ready, error } = usePlaidLink(config);

  if (error) {
    return <Alert intent="error" message={error.message || error} />;
  }

  return <Button text="Link Bank Account" icon={faLock} onClick={() => open()} disabled={!ready} />;
}
