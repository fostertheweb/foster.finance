import React, { useContext } from "react";
import Login from "../users/Login";

export default function({ as: Component, ...props }) {
  const isAuthenticated = useContext();

  return isAuthenticated ? <Component {...props} /> : <Login />;
}
