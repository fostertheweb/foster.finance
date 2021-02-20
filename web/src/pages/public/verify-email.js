import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelopeOpenText } from "@fortawesome/pro-duotone-svg-icons";
import { parse } from "query-string";
import Button from "components/common/button";
import { useLocation } from "react-router";
import { useResendSignUp } from "hooks/use-amplify-auth";
import { Panel } from "components/common/panel";

export default function () {
	const { status, mutate: resendSignUp } = useResendSignUp();
	const location = useLocation();
	const { email } = parse(location.search);

	return (
		<Panel title="Verify Email">
			<>
				<div className="w-full mt-6 text-center">
					<FontAwesomeIcon icon={faEnvelopeOpenText} size="5x" color="#5f6c7b" />
				</div>
				<h2 className="mt-6">Email verification required</h2>
				<p className="mt-2">You should have received an email from us with a link to verify your email address.</p>
				<Button
					large
					className="w-full mt-6"
					loading={status === "loading"}
					text="Send email again"
					icon={faPaperPlane}
					onClick={() => resendSignUp({ email })}
				/>
			</>
		</Panel>
	);
}
