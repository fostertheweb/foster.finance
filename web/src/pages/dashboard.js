import React from "react";
import { Link } from "react-router-dom";

export default function () {
	return (
		<div className="ff-pt-header">
			<div className="p-4">
				<h2 className="text-lg font-medium">Dashboard</h2>
				<Link to="/setup/accounts" className="block mt-4 underline">
					Finish setting up your account.
				</Link>
			</div>
		</div>
	);
}
