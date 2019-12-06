import React, { useState } from "react";
import { Button, FormGroup, H3, InputGroup, Intent } from "@blueprintjs/core";
import { Link, navigate } from "@reach/router";
import Logo from "../components/logo";
import { useAuth } from "../hooks/use-auth";
import Image from "../images/savings.svg";

export default function() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="wrap">
      <div className="left">
        <Logo />
        <div className="login-form">
          <H3>Log In</H3>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <form
            style={{ marginTop: "2rem", width: "20rem" }}
            onSubmit={e => {
              e.preventDefault();
              auth.signIn(email, password);
              navigate("/");
            }}>
            <FormGroup label="Email" labelFor="email">
              <InputGroup
                id="email"
                placeholder=""
                value={email}
                onChange={event => setEmail(event.target.value)}
                large
              />
            </FormGroup>
            <FormGroup label="Password" labelFor="password">
              <InputGroup
                id="password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                large
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit" intent={Intent.PRIMARY} large disabled={!email || !password}>
                Log In
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
      <div className="right">
        <img src={Image} alt="person with piggy bank" />
      </div>
    </div>
  );
}
