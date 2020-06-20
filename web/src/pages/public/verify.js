import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelopeOpenText, faUserCheck, faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import { parse } from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import Button from "../../components/common/button";
import Loading from "../../components/common/loading";
import Error from "../../components/common/error";
import { Panel } from "../../components/common/panel";

function CheckEmail({ email }) {
	const { resendSignUp, loading } = useAuth();

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
				loading={loading}
				text="Send email again"
				icon={faPaperPlane}
				onClick={() => resendSignUp(email)}
			/>
		</>
	);
}

function Confirmed({ id, code }) {
	const { loading, error, confirmSignUp } = useAuth();
	const email = atob(id);
	const navigate = useNavigate();

	useEffect(() => {
		confirmSignUp(email, code);
		setTimeout(() => {
			navigate("/");
		}, 1200);
		// eslint-disable-next-line
	}, []);

	if (loading) return <Loading />;
	if (error && error.code === "NotAuthorizedException") {
		navigate("/");
	}
	if (error) return <Error message={error.message} />;

	return (
		<>
			<div className="w-full text-center mt-6">
				<div className="fa-layers fa-fw h-4 block py-12 w-full text-center">
					<FontAwesomeIcon icon={faUserCheck} size="2x" className="text-green-500 fill-current" />
					<FontAwesomeIcon icon={faSpinnerThird} spin size="7x" className="text-gray-300 fill-current" />
				</div>
			</div>
			<h2 className="mt-6">Email address confirmed</h2>
			<p className="mt-2">You are now being redirected to sign in...</p>
		</>
	);
}

export default function () {
	const location = useLocation();
	const { id, code, email } = parse(location.search);

	return (
		<>
			{id ? (
				<Panel title="Confirm">
					<Confirmed id={id} code={code} />
				</Panel>
			) : (
				<Panel title="Verify">
					<CheckEmail email={email} />
				</Panel>
			)}
		</>
	);
}
