import React, { useState } from "react";
import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import EmojiInput from "../emoji-input";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuth } from "../../hooks/use-auth";

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
        <h2>Create your user profile</h2>
        <p>
          It's so great to meet you! If you would like, you can tell us your name and pick an emoji
          for your user profile.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            const input = { user_id: user.sub, email: user.email, name, emoji };
            createUser({ variables: { input } });
          }}>
          <EmojiInput onChange={setEmoji} />
          <div>
            <FormGroup label="Name" labelFor="name">
              <InputGroup
                id="name"
                placeholder="What should we call you?"
                onChange={event => setName(event.target.value)}
                large
              />
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                intent={error ? Intent.DANGER : Intent.PRIMARY}
                loading={loading}
                large>
                Save Profile
              </Button>
            </FormGroup>
          </div>
        </form>
      </div>
    </div>
  );
}
