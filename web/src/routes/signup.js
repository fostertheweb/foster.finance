import React from "react";
import { H2 } from "@blueprintjs/core";
import { Link } from "@reach/router";
import Logo from "../components/logo";
import SignUpForm from "../components/signup-form";
import { useAuth } from "../hooks/use-auth";
import Image from "../images/money.svg";

export default function() {
  const auth = useAuth();

  return (
    <>
      <div className="header">
        <Logo />
      </div>
      <div className="s-wrap">
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
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
