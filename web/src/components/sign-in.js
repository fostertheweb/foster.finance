import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./common/input";
import Button from "./common/button";
import { faSignIn } from "@fortawesome/pro-duotone-svg-icons";
import { getRandomEmail } from "../shared/placeholders";
import { Panel } from "./common/panel";

export default function () {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		console.log("SIGN_IN");
	}

	// if (error && error.code === "UserNotConfirmedException") {
	//   navigate(`/verify?email=${email}`);
	// }

	return (
		<Panel title="Sign in">
			<>
				<form onSubmit={(e) => handleSubmit(e)} className="mt-8">
					<div className="mb-6">
						<Input
							large
							id="email"
							label="Email"
							placeholder={getRandomEmail()}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<Input large type="password" id="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className="flex align-items justify-end">
						<Button
							large
							className="w-full"
							type="submit"
							text="Sign in"
							icon={faSignIn}
							disabled={!email || !password}
						/>
					</div>
				</form>
				<p className="mt-4 text-center text-gray-500">
					Don't have an account?{" "}
					<Link to="/create-account" className="ff-link">
						Create account
					</Link>
				</p>
			</>
			<>
				<span role="img" aria-label="hand waving" className="mr-2">
					👋
				</span>
				welcome back dear friend
			</>
		</Panel>
	);
}
