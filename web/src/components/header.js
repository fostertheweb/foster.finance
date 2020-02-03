import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSignOut } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";
import { Emoji } from "emoji-mart";
import Logo from "./logo";
import Alert from "./alert";
import { useAuth } from "../hooks/use-auth";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USER = gql`
  query getUser($uid: String!) {
    getUser(uid: $uid) {
      name
      emoji
    }
  }
`;

export function MinimalHeader() {
  return (
    <div className="flex items-center justify-between p-2 font-medium">
      <div>
        <Logo color="#094067" />
      </div>
      <div className="flex">
        <Link
          to="/create-account"
          className="ml-8 p-3 rounded hover:no-underline hover:text-gray-700 hover:bg-gray-200">
          Create Account
        </Link>
        <Link
          to="/signin"
          className="ml-8 p-3 rounded hover:no-underline hover:text-gray-700 hover:bg-gray-200">
          Sign in
        </Link>
      </div>
    </div>
  );
}

function HeaderLink({ path, icon, children }) {
  return (
    <Link
      to={`/${path}`}
      className="ml-8 hover:no-underline hover:text-white hover:bg-teal-600 p-2 rounded">
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{children}</span>
    </Link>
  );
}

function HeaderButton({ onClick, icon, children }) {
  return (
    <button
      className="ml-8 hover:no-underline hover:text-white hover:bg-teal-600 p-2 rounded"
      onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{children}</span>
    </button>
  );
}

function UserButton({ emoji, name }) {
  return (
    <Link
      to="/me"
      className="ml-8 hover:no-underline hover:text-white hover:bg-teal-600 p-2 rounded inline-flex items-center">
      <Emoji emoji={emoji} size={18} />
      <span className="ml-2">{name}</span>
    </Link>
  );
}

export default function({ user }) {
  const { signOut } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { uid: user.attributes.sub },
  });

  if (error) {
    return <Alert intent="error" message={error} />;
  }

  if (loading) {
    return <b>loading...</b>;
  }

  return (
    <div className="flex items-center justify-between p-2 bg-teal-500 text-white border-teal-600 border-b-2 font-medium">
      <div className="flex items-center">
        <Link to="/me" className="hover:no-underline hover:text-white">
          <Logo />
        </Link>
        <HeaderLink path="calendar" icon={faCalendar}>
          Calendar
        </HeaderLink>
      </div>
      <div className="flex items-center">
        <UserButton emoji={data.getUser.emoji} name={data.getUser.name} />
        <HeaderButton onClick={() => signOut()} icon={faSignOut}>
          Sign out
        </HeaderButton>
      </div>
    </div>
  );
}
