import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo";
import { useAuth } from "../../hooks/use-auth";

export default function() {
  const { newUser } = useAuth();

  return (
    <div className="ff-container flex items-center justify-between p-2 font-medium">
      <Link to="/" className="hover:no-underline">
        <Logo color="#094067" />
      </Link>
      {newUser ? null : (
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
      )}
    </div>
  );
}
