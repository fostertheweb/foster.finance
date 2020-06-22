import React from "react";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Layout from "components/layout";

import SignIn from "pages/public/sign-in";
import CreateAccount from "pages/public/create-account";
import Verify from "pages/public/verify-email";
import Confirm from "pages/public/confirm-email";

// import Settings from "pages/settings";
// import Setup from "pages/setup";
// import Transactions from "pages/transactions";
// import Balances from "pages/balances";

function App() {
	return (
		<div>
			<RecoilRoot>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="sign-in" element={<SignIn />} />
						<Route path="create-account" element={<CreateAccount />} />
						<Route path="verify" element={<Verify />} />
						<Route path="confirm" element={<Confirm />} />
						{/* <Route path="transactions" element={<Transactions />} />
						<Route path="balances" element={<Balances />} />
						<Route path="settings" element={<Settings />} />
						<Route path="setup" element={<Setup />} /> */}
					</Route>
				</Routes>
			</RecoilRoot>
		</div>
	);
}

export default App;
