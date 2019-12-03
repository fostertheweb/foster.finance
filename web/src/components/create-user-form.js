import React, { useState, useEffect } from "react";
import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { navigate } from "@reach/router";
import EmojiInput from "./emoji-input";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

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

  if (data) {
    navigate("/");
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const input = { user_id: user.sub, email: user.email, name, emoji };
        createUser({ variables: { input } });
      }}>
      <FormGroup label="Emoji">
        <EmojiInput onChange={setEmoji} />
      </FormGroup>
      <FormGroup label="Name" labelFor="name">
        <InputGroup
          id="name"
          placeholder="Jonathan"
          large
          onChange={event => setName(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button
          type="submit"
          intent={error ? Intent.DANGER : Intent.PRIMARY}
          loading={loading}
          large>
          Save Name &amp; Emoji
        </Button>
        <Button large>Skip</Button>
      </FormGroup>
    </form>
  );
}
