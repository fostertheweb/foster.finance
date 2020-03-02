import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../logo";
import { useAuth } from "../../hooks/use-auth";
import UserMenu from "./user-menu";

const url = process.env.REACT_APP_API_ENDPOINT;

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

export default function() {
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

    getUserInfo();
    // eslint-disable-next-line
  }, []);

  if (loading || fetching) {
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
          <HeaderLink path="expenses" icon={faCalendarAlt}>
            Expenses
          </HeaderLink>
        </div>
        <div className="flex items-center">
          <UserMenu
            emoji={data ? data.emoji : "hatching_chick"}
            name={data ? data.name : user.attributes.email}
          />
        </div>
      </div>
    </div>
  );
}
