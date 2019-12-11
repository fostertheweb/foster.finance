import React, { useState } from "react";
import { Button, FormGroup, H2, InputGroup, Intent, Tooltip } from "@blueprintjs/core";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "@reach/router";
import Image from "../../images/money.svg";

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

  function handleSubmit(e) {
    e.preventDefault();

    const user = auth.signUp(email, password);
    console.log({ signUp: user });
  }

  return (
    <>
      <div className="s-left">
        <img src={Image} alt="person with piggy bank" />
      </div>
      <div className="s-right">
        <H2>Get started</H2>
        <p>
          After creating an account you will connect to your bank so we can view your transactions
          and help you save more money.
        </p>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <form style={{ marginTop: "2rem", width: "20rem" }} onSubmit={e => handleSubmit(e)}>
          <FormGroup label="Email" labelFor="email">
            <InputGroup
              id="email"
              placeholder="Email address"
              onChange={e => setEmail(e.target.value)}
              large
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="password">
            <InputGroup
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create your password..."
              onChange={e => setPassword(e.target.value)}
              rightElement={showPasswordButton}
              large
            />
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              intent={Intent.SUCCESS}
              loading={auth.loading}
              disabled={!email || !password || auth.loading}
              large>
              Sign Up
            </Button>
          </FormGroup>
        </form>
      </div>
    </>
  );
}
