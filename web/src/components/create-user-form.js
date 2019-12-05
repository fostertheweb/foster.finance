import React, { useState } from "react";
import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { navigate } from "@reach/router";
import EmojiInput from "./emoji-input";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuth } from "../hooks/use-auth";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserRequest!) {
    createUser(input: $input) {
      name
    }
  }
`;

export default function({ user }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const auth = useAuth();

  if (data) {
    navigate("/");
  }

  if (!auth.user) {
    // navigate("/signup");
    console.log(auth);
  }

  return (
    <form
      className="create-user-form"
      onSubmit={e => {
        e.preventDefault();
        const input = { user_id: user.sub, email: user.email, name, emoji };
        createUser({ variables: { input } });
      }}>
      <EmojiInput onChange={setEmoji} />
      <div className="form-controls">
        <FormGroup label="Name" labelFor="name">
          <InputGroup
            id="name"
            placeholder="What should we call you?"
            large
            onChange={event => setName(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button minimal={true} style={{ marginRight: "1rem" }}>
            Skip for now
          </Button>
          <Button
            type="submit"
            intent={error ? Intent.DANGER : Intent.PRIMARY}
            loading={loading}
            large>
            Save Name &amp; Emoji
          </Button>
        </FormGroup>
      </div>
    </form>
  );
}
