import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../logo";
import { useAuth } from "../../hooks/use-auth";
import useFetch from "use-http";
import UserMenu from "./user-menu";
import Error from "../error";

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
  const { user, loading: isUserLoading } = useAuth();
  const { data, loading, error } = useFetch(
    `${url}/users/${user.attributes.sub}`,
    { cachePolicy: "no-cache" },
    [],
  );

  if (error) {
    return <Error message={error.message} />;
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
