import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelopeOpenText } from "@fortawesome/pro-duotone-svg-icons";
import { parse } from "query-string";
import Button from "components/common/button";
import { useLocation } from "react-router";

export default function () {
	const location = useLocation();
	const { email } = parse(location.search);

	function resendSignUp(email) {
		console.log("useAmplifyAuth - resendSignUp()", email);
	}

	return (
		<>
			<div className="w-full text-center mt-6">
				<FontAwesomeIcon icon={faEnvelopeOpenText} size="5x" color="#5f6c7b" />
			</div>
			<h2 className="mt-6">Email verification required</h2>
			<p className="mt-2">You should have received an email from us with a link to verify your email address.</p>
			<Button
				large
				className="w-full mt-6"
				loading={false}
				text="Send email again"
				icon={faPaperPlane}
				onClick={() => resendSignUp(email)}
			/>
		</>
	);
}
