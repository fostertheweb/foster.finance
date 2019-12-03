import React, { useState } from "react";
import { Button, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { useAuth } from "../hooks/use-auth";

export default function() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        auth.signUp(email, password);
      }}>
      <FormGroup label="Email" labelFor="email">
        <InputGroup
          id="email"
          placeholder="jonathan@fostertheweb.com"
          onChange={event => setEmail(event.target.value)}
          large
        />
      </FormGroup>
      <FormGroup label="Password" labelFor="password">
        <InputGroup
          id="password"
          type="password"
          placeholder="*************"
          onChange={event => setPassword(event.target.value)}
          large
        />
      </FormGroup>
      <FormGroup>
        <Button
          type="submit"
          intent={Intent.PRIMARY}
          loading={auth.loading}
          large
          disabled={!email || !password}>
          Sign Up
        </Button>
      </FormGroup>
    </form>
  );
}
