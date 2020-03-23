import React from "react";
import PlaidLink from "react-plaid-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faLock } from "@fortawesome/pro-duotone-svg-icons";
import { buttonStyle, primary } from "../../button";
import classNames from "classnames";

const product = process.env.REACT_APP_PLAID_PRODUCT_SCOPE.split(",");
const env = process.env.REACT_APP_PLAID_ENVIRONMENT;
const publicKey = process.env.REACT_APP_PLAID_PUBLIC_KEY;

const noOp = () => null;

export default function(props) {
  return (
    <PlaidLink
      style={{}}
      className={classNames(
        buttonStyle,
        primary,
        "py-3",
        "px-6",
        "text-base",
        "whitespace-no-wrap",
      )}
      clientName="foster finance"
      env={env}
      product={product}
      publicKey={publicKey}
      onExit={props.onLinkExit || noOp}
      onSuccess={props.onLinkSuccess}>
      <FontAwesomeIcon icon={props.loading ? faSpinnerThird : faLock} spin={props.loading} />
      <span className="ml-2 font-medium">{props.text || "Link Bank Account"}</span>
    </PlaidLink>
  );
}
