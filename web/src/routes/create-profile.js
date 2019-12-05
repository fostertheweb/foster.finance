import React from "react";
import { H2 } from "@blueprintjs/core";
import Logo from "../components/logo";
import CreateUserForm from "../components/create-user-form";

export default function() {
  return (
    <>
      <div className="header">
        <Logo />
      </div>
      <div className="s-wrap create-profile">
        <H2>Create your user profile</H2>
        <p>
          It's so great to meet you! If you would like, you can tell us your name and pick an emoji
          for your user profile.
        </p>
        <CreateUserForm />
      </div>
    </>
  );
}
