import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EmojiInput from "../emoji-input";
import { useAuth } from "../../hooks/use-auth";
import Input from "../input";
import Alert from "../alert";
import Button from "../button";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function({ editing }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const body = { user_id: user.attributes.sub, email: user.attributes.email, name, emoji };
    try {
      await fetch(`${url}/users`, {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      if (!editing) navigate("/app/setup/accounts");
    }
  }

  if (editing) {
    useEffect(() => {
      async function getUserInfo() {
        setFetching(true);
        const response = await fetch(`${url}/users/${user.attributes.sub}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const info = await response.json();
        setFetching(false);
        setName(info.name);
        setEmoji(info.emoji);
      }

      getUserInfo();
      // eslint-disable-next-line
    }, []);
  }

  return (
    <div className="ff-h-full w-2/3 p-4">
      {!editing ? (
        <>
          <h1 className="text-xl font-bold text-gray-700">Create User Profile</h1>
          <div className="text-gray-700 my-3">
            <p>
              It's so great to meet you! If you would like, you can tell us your name and pick an
              emoji so things feel more personal around here.
            </p>
          </div>
        </>
      ) : null}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full bg-white p-4 rounded shadow">
        <EmojiInput colons={emoji} onChange={setEmoji} loading={fetching} />
        <div className="ml-6 w-full">
          <Input
            value={name}
            label="Name"
            id="name"
            placeholder="What should we call you?"
            onChange={event => setName(event.target.value)}
            loading={fetching}
          />
        </div>
        <Button
          className="ml-2 whitespace-no-wrap"
          icon={faSave}
          type="submit"
          text="Save Profile"
          loading={loading}
          disabled={fetching || loading}
        />
      </form>
      {error ? <Alert intent="error" message={error.message || error} /> : null}
    </div>
  );
}
