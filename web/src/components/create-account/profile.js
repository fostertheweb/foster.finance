import React, { useState } from "react";
import { useNavigate } from "react-router";
import EmojiInput from "../emoji-input";
import { useAuth } from "../../hooks/use-auth";
import Input from "../input";
import Alert from "../alert";
import useFetch from "use-http";
import Button from "../button";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const { post, loading, error } = useFetch(url);
  const { newUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { user_id: newUser.userSub, email: newUser.user.username, name, emoji };
    await post("/users", body);

    if (!loading && !error) {
      navigate(`/create-account/verify?email=${newUser.user.username}`);
    }
  }

  return (
    <div className="flex justify-center my-4">
      <div className="lg:w-1/3 md:w-1/2 w-3/4">
        <h2 className="my-4">Create your user profile</h2>
        <p className="mb-8">
          It's so great to meet you! If you would like, you can tell us your name and pick an emoji
          so things feel more personal around here.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-2">
            <EmojiInput onChange={setEmoji} />
            <div className="ml-6 w-full">
              <Input
                label="Name"
                id="name"
                placeholder="What should we call you?"
                onChange={event => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            {error ? <Alert intent="error" message={error.message || error} /> : null}
            <Button type="submit" text="Save Profile" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
}
