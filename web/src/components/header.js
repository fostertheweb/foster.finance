import React from "react";
import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { Link } from "@reach/router";
import Logo from "./logo";
import { useAuth } from "../hooks/use-auth";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USER = gql`
  {
    getUser(uid: $uid) {
      first_name
      last_name
      emoji
    }
  }
`;

export default function() {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, { variables: { uid: user.uid } });

  if (loading) return "Loading...";
  if (error) return error.message;

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Link to="/">
          <Logo />
        </Link>
        <Navbar.Divider />
        <Link to="/accounts">
          <Button className="bp3-minimal" icon="bank-account" text="Accounts" />
        </Link>
        <Link to="/expenses">
          <Button className="bp3-minimal" icon="dollar" text="Expenses" />
        </Link>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Link to="login">
          <Button icon="user" text={data.first_name} />
        </Link>
      </Navbar.Group>
    </Navbar>
  );
}