import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/header";
import { useIsAuthenticated } from "hooks/use-amplify-auth";

export default function () {
	const isAuthenticated = useIsAuthenticated();
	return (
		<div>
			{isAuthenticated && <Header />}
			<Outlet />
		</div>
	);
}
