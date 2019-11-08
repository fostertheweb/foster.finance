import React, { useState } from "react";
import { Button, FormGroup, H2, InputGroup, Intent } from "@blueprintjs/core";
import { Link, navigate } from "@reach/router";
import Logo from "../components/logo";
import { useAuth } from "../hooks/use-auth";

export default function() {
  const auth = useAuth();
  const [email, setLoginEmail] = useState("");
  const [password, setLoginPassword] = useState("");

  return (
    <div className="wrap">
      <div className="left">
        <Logo />
        <H2>Log In</H2>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            const user = auth.signin(email, password);
            console.log(user);
            navigate("/");
          }}>
          <FormGroup label="Email" labelFor="email">
            <InputGroup
              id="email"
              placeholder=""
              value={email}
              onChange={event => setLoginEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="password">
            <InputGroup
              id="password"
              type="password"
              value={password}
              onChange={event => setLoginPassword(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" intent={Intent.PRIMARY} large disabled={!email || !password}>
              Log In
            </Button>
          </FormGroup>
        </form>
      </div>
      <div className="right">a big thing</div>
    </div>
  );
}
