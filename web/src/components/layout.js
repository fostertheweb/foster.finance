import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import Error from "./error";
import Loading from "./loading";
import Header from "./header";

export default function() {
  const { user, loading, error } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!user) {
    navigate("/");
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
