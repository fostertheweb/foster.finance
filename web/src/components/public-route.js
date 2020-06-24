import React from "react";
import { Redirect, Route } from "react-router";

function isAuthenticated() {
	return true;
}

export default function PublicRoute() {
	if (isAuthenticated()) {
		return <Redirect to="/transactions" />;
	}

	return <Route element={} path={} />;
}
