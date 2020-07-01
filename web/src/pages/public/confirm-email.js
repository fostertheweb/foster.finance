import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { parse } from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

export default function () {
	const location = useLocation();
	const { id, code } = parse(location.search);
	const email = atob(id);

	function confirmSignUp(email, code) {
		console.log("useAmplifyAuth - confirmSignUp()", email, code);
	}

	useEffect(() => {
		confirmSignUp(email, code);
		//eslint-disable-next-line
	}, []);

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
