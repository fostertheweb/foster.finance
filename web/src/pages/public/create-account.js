import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faBullseyePointer } from "@fortawesome/pro-duotone-svg-icons";
import { getRandomEmail } from "lib/placeholders";
import Input from "components/common/input";
import Button from "components/common/button";
import { Panel } from "components/common/panel";

export default function () {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		console.log("useAmplifyAuth - signUp");
	}

	return (
		<Panel title="Join">
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
					<div className="flex items-center justify-end">
						<Button
							large
							className="w-full"
							type="submit"
							text="Create Account"
							icon={faBullseyePointer}
							disabled={!email || !password}
						/>
					</div>
				</form>
				<p className="mt-4 text-center text-gray-500">
					Already have an account?{" "}
					<Link to="/" className="ff-link">
						Sign in
					</Link>
				</p>
			</>
			<p className="block p-4">try it out, full refund available</p>
		</Panel>
	);
}
