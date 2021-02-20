import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { parse } from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import { useConfirmSignUp } from "hooks/use-amplify-auth";
import { Panel } from "components/common/panel";

export default function () {
	const { status, mutate: confirmSignUp } = useConfirmSignUp();
	const navigate = useNavigate();
	const location = useLocation();
	const { id, code } = parse(location.search);
	const email = atob(id);

	useEffect(() => {
		confirmSignUp({ email, code });
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (status === "success") {
			navigate("/");
		}
		//eslint-disable-next-line
	}, [status]);

	return (
		<Panel title="Confirm Email">
			<>
				<div className="text-center">
					<div className="block w-full h-4 py-12 text-center fa-layers fa-fw">
						<FontAwesomeIcon icon={faUserCheck} size="2x" className="text-green-500 fill-current" />
						<FontAwesomeIcon icon={faSpinnerThird} spin size="7x" className="text-gray-300 fill-current" />
					</div>
				</div>
				<h2 className="mt-6">Email address confirmed</h2>
				<p className="mt-2">You are now being redirected to sign in...</p>
			</>
		</Panel>
	);
}
