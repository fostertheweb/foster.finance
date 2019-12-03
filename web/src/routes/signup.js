import React from "react";
import { Icon, Intent, H2 } from "@blueprintjs/core";
import { Link } from "@reach/router";
import Logo from "../components/logo";
import SignUpForm from "../components/signup-form";
import CreateUserForm from "../components/create-user-form";

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
          and help you save more money. Already have an account?{" "}
          <Link to="/public/login">Log in</Link>
        </p>
        <div className="signup-form">
          <div className="signup-progress">
            <div className="form-step form-step--active">
              <Icon icon="key" intent={Intent.PRIMARY} />
              <div>Login</div>
            </div>
            <div className="connection">&nbsp;</div>
            <div className="form-step">
              <Icon icon="user" />
              <div>Profile</div>
            </div>
            <SignUpForm />
            <CreateUserForm />
          </div>
        </div>
      </div>
    </div>
  );
}
