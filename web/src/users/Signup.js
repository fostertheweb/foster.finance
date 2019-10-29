import React from "react";
import { Button, Card, FormGroup, InputGroup, Intent, H2 } from "@blueprintjs/core";
import { Link } from "@reach/router";
import Logo from "../common/Logo";

export default function() {
  return (
    <div className="s-wrap">
      <div className="s-left">
        <Logo />
      </div>
      <div className="s-right">
        <H2>Get started by creating an account</H2>
        <p>
          After creating an account you will connect to your bank so we can view your transactions
          and help you save more money. Already have an account? <Link to="/login">Log in</Link>
        </p>
        <FormGroup label="First Name" labelFor="email">
          <InputGroup id="email" placeholder="" />
        </FormGroup>
        <FormGroup label="Last Name" labelFor="email">
          <InputGroup id="email" placeholder="" />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup id="email" placeholder="" />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup id="password" type="password" />
        </FormGroup>
        <FormGroup>
          <Button intent={Intent.PRIMARY} large disabled>
            Sign Up
          </Button>
        </FormGroup>
      </div>
    </div>
  );
}
