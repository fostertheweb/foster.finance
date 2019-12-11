import React, { useState } from "react";
import { Button, FormGroup, H2, InputGroup, Intent } from "@blueprintjs/core";
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
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const { user } = useAuth();

  console.log(data);

  return (
    <>
      <H2>Create your user profile</H2>
      <p>
        It's so great to meet you! If you would like, you can tell us your name and pick an emoji
        for your user profile.
      </p>
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
    </>
  );
}
