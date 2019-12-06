import React, { useState } from "react";
import { Button, FormGroup, InputGroup, Intent, Tooltip } from "@blueprintjs/core";
import { useAuth } from "../hooks/use-auth";
import { navigate } from "@reach/router";

export default function() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordButton = (
    <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
      <Button
        icon={showPassword ? "eye-open" : "eye-off"}
        onClick={() => setShowPassword(!showPassword)}
        minimal={true}
      />
    </Tooltip>
  );

  return (
    <form
      style={{ marginTop: "2rem", width: "20rem" }}
      onSubmit={e => {
        e.preventDefault();
        auth.signUp(email, password);
        if (!auth.error) {
          navigate("/create-profile");
        } else {
          console.error(auth.error);
        }
      }}>
      <FormGroup label="Email" labelFor="email">
        <InputGroup
          id="email"
          placeholder="Email address"
          onChange={event => setEmail(event.target.value)}
          large
        />
      </FormGroup>
      <FormGroup label="Password" labelFor="password">
        <InputGroup
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Create your password..."
          onChange={event => setPassword(event.target.value)}
          rightElement={showPasswordButton}
          large
        />
      </FormGroup>
      <FormGroup>
        <Button
          type="submit"
          intent={Intent.PRIMARY}
          loading={auth.loading}
          disabled={!email || !password}
          large>
          Sign Up
        </Button>
      </FormGroup>
    </form>
  );
}
