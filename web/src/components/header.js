import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faSignOut } from "@fortawesome/pro-duotone-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Emoji } from "emoji-mart";
import Logo from "./logo";
import { useAuth } from "../hooks/use-auth";
import useFetch from "use-http";

const url = process.env.REACT_APP_API_ENDPOINT;

export function MinimalHeader() {
  return (
    <div className="ff-container flex items-center justify-between p-2 font-medium">
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
      className="ml-8 hover:no-underline hover:text-white hover:bg-gray-800 p-2 rounded">
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{children}</span>
    </Link>
  );
}

function UserButton({ emoji, name }) {
  const { signOut } = useAuth();
  return (
    <div className="group relative">
      <Link
        to="/app/home"
        className="block ml-4 hover:no-underline hover:text-white group-hover:bg-gray-800 hover:bg-gray-800 p-2 rounded inline-flex items-center">
        <Emoji emoji={emoji} size={18} />
        <span className="ml-2">{name}</span>
      </Link>
      <div className="hidden group-hover:block absolute right-0 w-40 z-50 bg-white rounded py-2 shadow-md">
        <Link
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-gray-900 hover:no-underline font-normal"
          to="/app/accounts">
          Manage Accounts
        </Link>
        <Link
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-gray-900 hover:no-underline font-normal"
          to="/app/profile">
          Edit Profile
        </Link>
        <a
          href
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-gray-900 hover:no-underline font-normal w-full"
          onClick={() => signOut()}>
          <FontAwesomeIcon icon={faSignOut} />
          <span className="ml-2">Sign out</span>
        </a>
      </div>
    </div>
  );
}

export default function() {
  const navigate = useNavigate();
  const { user, loading: isUserLoading } = useAuth();
  const { data, loading, error } = useFetch(
    `${url}/users/${user.attributes.sub}`,
    { cachePolicy: "no-cache" },
    [],
  );

  if (error) {
    navigate("/error", { error });
  }

  if (loading || isUserLoading) {
    return (
      <div className="flex items-center justify-between p-2 bg-gray-700 text-white border-gray-800 border-b-2 font-medium w-full">
        <div className="ff-container">
          <Logo dark />
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-700 text-white border-gray-800 border-b-2 font-medium">
      <div className="ff-container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/app/home" className="hover:no-underline hover:text-white">
            <Logo dark />
          </Link>
          {data ? (
            <>
              <HeaderLink path="expenses" icon={faCalendarAlt}>
                Expenses
              </HeaderLink>
            </>
          ) : null}
        </div>
        <div className="flex items-center">
          <UserButton
            emoji={data ? data.emoji : "hatching_chick"}
            name={data ? data.name : user.attributes.email}
          />
        </div>
      </div>
    </div>
  );
}
