import React, { useState } from "react";
import { Button, FormGroup, InputGroup, Intent, Tooltip } from "@blueprintjs/core";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "@reach/router";
import Image from "../../images/money.svg";
import VerifyCredentials from "./verify-credentials";

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
    <div className="flex items-center justify-center w-9/12 mx-auto my-10">
      <div className="p-4 w-9/12">
        <img src={Image} alt="man making it rain with dollar bills" />
      </div>
      <div className="p-4 w-1/2">
        {auth.user.data && !auth.user.error ? (
          <VerifyCredentials />
        ) : (
          <>
            <h2 className="my-2 text-lg font-bold">Get started</h2>
            <p className="my-2">
              After creating an account you will connect to your bank so we can view your
              transactions and help you save more money.
            </p>
            <p className="my-4">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
            <form onSubmit={e => handleSubmit(e)} className="my-4">
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
          </>
        )}
      </div>
    </div>
  );
}
