import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../logo";
import { useAuth } from "../../hooks/use-auth";
import UserMenu from "./user-menu";

const url = process.env.REACT_APP_API_ENDPOINT;

function HeaderLink({ dark, path, icon, children }) {
  const theme = dark
    ? "hover:text-white hover:bg-gray-800"
    : "text-gray-700 hover:text-gray-700 hover:bg-gray-200";
  return (
    <Link to={`/app/${path}`} className={`ml-4 hover:no-underline  p-2 rounded ${theme}`}>
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{children}</span>
    </Link>
  );
}

export default function({ dark }) {
  const { user, loading } = useAuth();
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      setFetching(true);
      const response = await fetch(`${url}/users/${user.attributes.sub}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const info = await response.json();
      setData(info);
      setFetching(false);
    }

    if (!loading && user) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [user]);

  const light = "border-transparent";
  const _dark = "bg-gray-700 text-white border-gray-800";

  return (
    <div className={`p-2 border-b-2 font-medium ${dark ? _dark : light}`}>
      <div className="ff-container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="hover:no-underline mr-4">
            <Logo dark={dark} />
          </Link>
          {loading || fetching ? null : (
            <>
              <HeaderLink path="expenses" icon={faCalendarAlt} dark={dark}>
                Expenses
              </HeaderLink>
              <HeaderLink path="balances" icon={faCoins} dark={dark}>
                Balances
              </HeaderLink>
            </>
          )}
        </div>
        <div className="flex items-center">
          {user ? (
            <UserMenu
              dark={dark}
              loading={loading || fetching}
              emoji={data ? data.emoji : "hatching_chick"}
              name={data ? data.name : user.attributes.email}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
