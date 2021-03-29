import React from "react";
import { usePlaidLink } from "react-plaid-link";
import { faLock } from "@fortawesome/pro-duotone-svg-icons";
import Button from "./common/button";
import Alert from "./common/alert";

const noOp = () => null;

export default function (props) {
	const config = {
		token: props.token,
		onSuccess: props.onLinkSuccess,
		onExit: props.onLinkExit || noOp,
	};

	const { open, ready, error } = usePlaidLink(config);

	if (error) {
		return <Alert intent="error" message={error.message || error} />;
	}

	return <Button text="Link Bank Account" icon={faLock} onClick={() => open()} disabled={!ready} />;
}
