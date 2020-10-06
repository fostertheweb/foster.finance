import React from "react";
import { Navigate, Route } from "react-router";
import Loading from "components/common/loading";

export default function PublicRoute({ element: Element, path }) {
	// return <Navigate to="/sign-in" replace />;
	return <Route element={<Element />} path={path} />;
}
