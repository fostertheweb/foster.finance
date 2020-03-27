import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EmojiInput from "../emoji-input";
import { useAuth } from "../../hooks/use-auth";
import Input from "../input";
import Alert from "../alert";
import Button from "../button";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import { useFetch } from "../../hooks/use-fetch";
import { fetchMachine } from "../../machines/fetch";
import { useMachine } from "@xstate/react";

export default function({ editing }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { get, post, patch } = useFetch();
  const [fetchProfileState, sendFetchProfile] = useMachine(fetchMachine, {
    services: {
      fetchData: () => get("/profile"),
    },
  });
  const [postProfileState, sendPostProfile] = useMachine(fetchMachine, {
    services: {
      fetchData: (_context, { profile }) =>
        editing ? patch("/profile", profile) : post("/profile", profile),
    },
  });
  const fetched = fetchProfileState.matches("resolved");
  const saved = postProfileState.matches("resolved");
  const { error } = postProfileState.context;

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { user_id: user.attributes.sub, email: user.attributes.email, name, emoji };
    sendPostProfile({ type: "FETCH", profile: body });
  }

  useEffect(() => {
    if (editing) {
      sendFetchProfile("FETCH");
    }
    //eslint-disable-next-line
  }, [editing]);

  useEffect(() => {
    if (fetched) {
      const profile = fetchProfileState.context.data;
      setName(profile.name);
      setEmoji(profile.emoji);
    }
    //eslint-disable-next-line
  }, [fetched]);

  useEffect(() => {
    if (!editing && saved) {
      navigate("/app/setup/accounts");
    }
    //eslint-disable-next-line
  }, [saved]);

  return (
    <div className="w-full sm:w-2/3 md:w-1/2 mt-4 bg-white p-4 rounded shadow">
      {!editing ? (
        <>
          <h1 className="text-xl font-bold text-gray-700">Create User Profile</h1>
          <div className="text-gray-700 mt-2 mb-6">
            <p>
              It's so great to meet you! If you would like, you can tell us your name and pick an
              emoji so things feel more personal around here.
            </p>
          </div>
        </>
      ) : null}
      <form onSubmit={handleSubmit} className="flex items-end w-full">
        <EmojiInput
          colons={emoji}
          onChange={setEmoji}
          loading={fetchProfileState.matches("loading")}
        />
        <div className="ml-6 w-full">
          <Input
            value={name}
            label="Name"
            id="name"
            placeholder="What should we call you?"
            onChange={event => setName(event.target.value)}
            loading={fetchProfileState.matches("loading")}
          />
        </div>
        <Button
          className="ml-2 whitespace-no-wrap"
          icon={faSave}
          type="submit"
          text="Save Profile"
          loading={postProfileState.matches("loading")}
          disabled={postProfileState.matches("loading") || fetchProfileState.matches("loading")}
        />
        {error ? <Alert intent="error" message={error.message || error} /> : null}
      </form>
    </div>
  );
}
