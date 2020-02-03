import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSignOut } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../hooks/use-auth";
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";

// const GET_USER = gql`
//   {
//     getUser(uid: $uid) {
//       first_name
//       last_name
//       emoji
//     }
//   }
// `;

export function MinimalHeader() {
  return (
    <div className="p-4">
      <Logo />
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

export default function() {
  const { loading, user, signOut } = useAuth();
  // const { data, loading, error } = useQuery(GET_USER, { variables: { uid: user.username } });

  // if (loading) return "Loading...";
  // if (error) return error.message;

  return (
    <div className="flex items-center justify-between p-2 bg-teal-500 text-white border-teal-600 border-b-2 font-medium">
      <div className="flex items-center">
        <Link to="/" className="hover:no-underline hover:text-teal-200">
          <Logo />
        </Link>
        <HeaderLink path="calendar" icon={faCalendar}>
          Calendar
        </HeaderLink>
      </div>
      <div>
        <HeaderButton onClick={() => signOut()} icon={faSignOut}>
          Sign out
        </HeaderButton>
      </div>
    </div>
  );
}
