import React from "react";
import { Navigate, Route } from "react-router";
import { isAuthenticatedSelector } from "hooks/amplify-auth";
import Loading from "components/common/loading";
import { useRecoilValueLoadable } from "recoil";

export default function PrivateRoute({ element: Element, path }) {
	// return <Route element={<Element />} path={path} />;
	return <Navigate to="/sign-in" replace />;
}
