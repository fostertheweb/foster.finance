import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/header";
import Navbar from "components/navbar";

export default function () {
	return (
		<div>
			<Header />
			<Outlet />
			<Navbar />
		</div>
	);
}
