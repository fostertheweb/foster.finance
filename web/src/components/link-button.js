import React from "react";
import { usePlaidLink } from "react-plaid-link";
import { faLock } from "@fortawesome/pro-duotone-svg-icons";
import Button from "./common/button";
import Alert from "./common/alert";

const {
	REACT_APP_PLAID_ENVIRONMENT: env,
	REACT_APP_PLAID_PRODUCT_SCOPE: product,
	REACT_APP_PLAID_PUBLIC_KEY: publicKey,
} = process.env;

const noOp = () => null;

export default function (props) {
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
