import React from "react";
import { Navigate, Route } from "react-router";
import { isAuthenticatedSelector } from "hooks/use-amplify-auth";
import Loading from "components/common/loading";
import { useRecoilValueLoadable } from "recoil";

export default function PublicRoute({ element: Element, path }) {
	// return <Navigate to="/sign-in" replace />;
	return <Route element={<Element />} path={path} />;
}
