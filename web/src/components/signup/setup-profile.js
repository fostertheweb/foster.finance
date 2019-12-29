import React, { useState } from "react";
import EmojiInput from "../emoji-input";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuth } from "../../hooks/use-auth";
import Input, { Submit } from "../input";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserRequest!) {
    createUser(input: $input) {
      name
    }
  }
`;

export default function() {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const { user } = useAuth();

  return (
    <div className="flex justify-center my-4">
      <div className="lg:w-1/3 md:w-1/2 w-3/4">
        <h2 className="my-4">Create your user profile</h2>
        <p className="mb-8">
          It's so great to meet you! If you would like, you can tell us your name and pick an emoji
          so things feel more personal around here.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            const input = { user_id: user.sub, email: user.email, name, emoji };
            createUser({ variables: { input } });
          }}>
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
          <Submit text="Save Profile" loading={loading} />
        </form>
      </div>
    </div>
  );
}
