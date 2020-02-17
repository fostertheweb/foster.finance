import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSignOut } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";
import { Emoji } from "emoji-mart";
import Logo from "./logo";
import { useAuth } from "../hooks/use-auth";
import useFetch from "use-http";

const url = process.env.REACT_APP_API_ENDPOINT;

export function MinimalHeader() {
  return (
    <div className="flex items-center justify-between p-2 font-medium">
      <Link to="/" className="hover:no-underline">
        <Logo color="#094067" />
      </Link>
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
      to={`/app/${path}`}
      className="ml-8 hover:no-underline hover:text-white hover:bg-teal-600 p-2 rounded">
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{children}</span>
    </Link>
  );
}

function HeaderButton({ onClick, icon, children }) {
  return (
    <button
      className="ml-4 hover:no-underline hover:text-white hover:bg-teal-600 p-2 rounded"
      onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{children}</span>
    </button>
  );
}

function UserButton({ emoji, name }) {
  return (
    <Link
      to="/app/home"
      className="ml-4 hover:no-underline hover:text-white hover:bg-teal-600 p-2 rounded inline-flex items-center">
      <Emoji emoji={emoji} size={18} />
      <span className="ml-2">{name}</span>
    </Link>
  );
}

export default function() {
  const { signOut, user, loading: isUserLoading } = useAuth();
  const { data, loading, error } = useFetch(
    `${url}/users/${user.attributes.sub}`,
    { cachePolicy: "no-cache" },
    [],
  );

  if (error) {
    console.error(error);
  }

  if (loading || isUserLoading) {
    return <b>loading header...</b>;
  }

  return (
    <div className="flex items-center justify-between p-2 bg-teal-500 text-white border-teal-600 border-b-2 font-medium">
      <div className="flex items-center">
        <Link to="/app/home" className="hover:no-underline hover:text-white">
          <Logo dark />
        </Link>
        {data ? (
          <HeaderLink path="calendar" icon={faCalendar}>
            Calendar
          </HeaderLink>
        ) : null}
      </div>
      <div className="flex items-center">
        <UserButton
          emoji={data ? data.emoji : "hatching_chick"}
          name={data ? data.name : user.attributes.email}
        />
        <HeaderButton onClick={() => signOut()} icon={faSignOut}>
          Sign out
        </HeaderButton>
      </div>
    </div>
  );
}
