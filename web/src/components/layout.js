import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/header";
import { useCurrentUser } from "hooks/use-amplify-auth";

export default function () {
	const { data, status } = useCurrentUser();

	console.log(data, status);

	return (
		<div>
			{data && <Header />}
			<Outlet />
		</div>
	);
}
