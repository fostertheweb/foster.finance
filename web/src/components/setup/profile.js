import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMachine } from "@xstate/react";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import { useAuth } from "../../hooks/use-auth";
import { useFetch } from "../../hooks/use-fetch";
import { fetchMachine } from "../../machines/fetch";
import EmojiInput from "../common/emoji-input";
import Input from "../common/input";
import Alert, { Well } from "../common/alert";
import Button from "../common/button";

export default function ({ editing }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const fetch = useFetch();
  const [postProfileState, sendPostProfile] = useMachine(fetchMachine, {
    services: {
      fetchData: (_context, { profile }) =>
        fetch("/profile", { method: "POST", body: { profile } }),
    },
  });
  const saved = postProfileState.matches("resolved");
  const { error } = postProfileState.context;

  async function handleSubmit() {
    const body = { user_id: user.attributes.sub, email: user.attributes.email, name, emoji };
    sendPostProfile({ type: "FETCH", profile: body });
  }

  useEffect(() => {
    if (saved) {
      navigate("/app/setup/accounts");
    }
    //eslint-disable-next-line
  }, [saved]);

  return (
    <>
      <div className="p-2 w-2/3">
        <div className="w-full bg-white p-4 rounded shadow">
          <h1 className="text-xl font-bold text-gray-700 tracking-wide">Setup Your Profile</h1>
          <div className="text-gray-600 mt-4">
            <p className="leading-normal">
              It's so great to meet you! If you would like, you can tell us your name and pick an
              emoji so things feel more personal around here.
            </p>
          </div>
          <div className="mt-6 flex items-end w-full">
            <EmojiInput colons={emoji} onChange={setEmoji} />
            <div className="ml-6 w-full">
              <Input
                value={name}
                label="Name"
                id="name"
                placeholder="What should we call you?"
                onChange={event => setName(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 sticky ff-top-0 p-2 pl-1 flex-grow">
        <Well
          message={
            <div>
              You can change your name or emoji anytime in <b>Settings</b> when signed in.
            </div>
          }
        />
        <Button
          className="mt-2 w-full whitespace-no-wrap"
          onClick={handleSubmit}
          icon={faSave}
          text="Save Profile"
          loading={postProfileState.matches("loading")}
          disabled={postProfileState.matches("loading")}
        />
        {error ? <Alert intent="error" message={error.message || error} /> : null}
      </div>
    </>
  );
}
