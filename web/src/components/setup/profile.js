import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import EmojiInput from "components/common/emoji-input";
import Input from "components/common/input";
import Alert, { Well } from "components/common/alert";
import Button from "components/common/button";
import { useCreateProfile } from "hooks/use-profile";
import { useCurrentUser } from "hooks/use-amplify-auth";

export default function () {
	const { data: user } = useCurrentUser();
	const [createProfile, { status, error }] = useCreateProfile();
	const [name, setName] = useState("");
	const [emoji, setEmoji] = useState("");
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		createProfile({ user_id: user.attributes.sub, email: user.attributes.email, name, emoji });
	}

	useEffect(() => {
		if (status === "success") {
			navigate("/setup/accounts");
		}
		//eslint-disable-next-line
	}, [status]);

	return (
		<>
			<div className="w-2/3 p-2">
				<div className="w-full p-4 bg-white rounded shadow">
					<h1 className="text-xl font-bold tracking-wide text-gray-700">Setup Your Profile</h1>
					<div className="mt-4 text-gray-600">
						<p className="leading-normal">
							It's so great to meet you! If you would like, you can tell us your name and pick an emoji so things feel
							more personal around here.
						</p>
					</div>
					<div className="flex items-end w-full mt-6">
						<EmojiInput colons={emoji} onChange={setEmoji} />
						<div className="w-full ml-6">
							<Input
								value={name}
								label="Name"
								id="name"
								placeholder="What should we call you?"
								onChange={(event) => setName(event.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="sticky flex-grow w-1/3 p-2 pl-1 ff-top-0">
				<Well
					message={
						<div>
							You can change your name or emoji anytime in <b>Settings</b> when signed in.
						</div>
					}
				/>
				<Button
					className="w-full mt-2 whitespace-no-wrap"
					onClick={handleSubmit}
					icon={faSave}
					text="Save Profile"
					loading={status === "loading"}
					disabled={status === "loading"}
				/>
				{error ? <Alert intent="error" message={error.message || error} /> : null}
			</div>
		</>
	);
}
