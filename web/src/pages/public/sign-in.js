import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/common/input";
import Button from "components/common/button";
import { faSignIn } from "@fortawesome/pro-duotone-svg-icons";
import { getRandomEmail } from "lib/placeholders";
import { Panel } from "components/common/panel";
import { useSignIn } from "hooks/use-amplify-auth";

export default function () {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { status, mutate: signIn } = useSignIn();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		signIn({ email, password });
	}

	useEffect(() => {
		if (status === "success") {
			navigate("/dashboard");
		}
		//eslint-disable-next-line
	}, [status]);

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
					<div className="flex justify-end align-items">
						<Button
							large
							className="w-full"
							type="submit"
							text="Sign in"
							icon={faSignIn}
							disabled={!email || !password}
							loading={status === "loading"}
						/>
					</div>
				</form>
				<p className="mt-4 text-center text-gray-500">
					Don't have an account?{" "}
					<Link to="/join" className="ff-link">
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
