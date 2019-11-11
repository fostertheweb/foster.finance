import React, { useState } from "react";
import { Button, FormGroup, InputGroup, Intent, H2 } from "@blueprintjs/core";
import { Link, navigate } from "@reach/router";
import Logo from "../components/logo";
import { useAuth } from "../hooks/use-auth";

export default function() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="s-wrap">
      <div className="s-left">
        <Logo />
      </div>
      <div className="s-right">
        <H2>Get started by creating an account</H2>
        <p>
          After creating an account you will connect to your bank so we can view your transactions
          and help you save more money. Already have an account?{" "}
          <Link to="/public/login">Log in</Link>
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            auth.signUp(email, password);
            navigate("/");
          }}>
          <FormGroup label="First Name" labelFor="firstName">
            <InputGroup id="firstName" placeholder="" />
          </FormGroup>
          <FormGroup label="Last Name" labelFor="lastName">
            <InputGroup id="lastName" placeholder="" />
          </FormGroup>
          <FormGroup label="Email" labelFor="email">
            <InputGroup
              id="email"
              placeholder=""
              onChange={event => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="password">
            <InputGroup
              id="password"
              type="password"
              onChange={event => setPassword(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" intent={Intent.PRIMARY} large disabled={!email || !password}>
              Sign Up
            </Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}
