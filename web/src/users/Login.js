import React from "react";
import { Button, FormGroup, H2, InputGroup, Intent } from "@blueprintjs/core";
import { Link } from "@reach/router";
import Logo from "../common/Logo";

export default function() {
  return (
    <div className="wrap">
      <div className="left">
        <Logo />
        <H2>Log In</H2>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <FormGroup label="Email" labelFor="email">
          <InputGroup id="email" placeholder="" />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup id="password" type="password" />
        </FormGroup>
        <FormGroup>
          <Button intent={Intent.PRIMARY} large>
            Log In
          </Button>
        </FormGroup>
      </div>
      <div className="right">a big thing</div>
    </div>
  );
}
