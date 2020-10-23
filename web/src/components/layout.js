import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/header";

export default function ({ isAuthenticated }) {
	return (
		<div>
			{isAuthenticated && <Header />}
			<Outlet />
		</div>
	);
}
