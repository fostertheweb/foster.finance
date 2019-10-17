import React from "react";
import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { Link } from "@reach/router";

export default function() {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Link to="/">
          <Navbar.Heading>Outlay</Navbar.Heading>
        </Link>
        <Navbar.Divider />
        <Link to="accounts">
          <Button className="bp3-minimal" icon="bank-account" text="Accounts" />
        </Link>
        <Link to="expenses">
          <Button className="bp3-minimal" icon="dollar" text="Expenses" />
        </Link>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button icon="user" text="Login" />
      </Navbar.Group>
    </Navbar>
  );
}
