import React from "react";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Layout from "components/layout";

import SignIn from "pages/public/sign-in";
import CreateAccount from "pages/public/create-account";
import Verify from "pages/public/verify-email";
import Confirm from "pages/public/confirm-email";
import SetupLayout from "components/setup";
import Dashboard from "pages/dashboard";

import SetupProfile from "components/setup/profile";
import SetupAccounts from "components/setup/accounts";

// import Settings from "pages/settings";

// import Transactions from "pages/transactions";
// import Balances from "pages/balances";

function App() {
	return (
		<div>
			<RecoilRoot>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<SignIn />} />
						<Route path="join" element={<CreateAccount />} />
						<Route path="verify" element={<Verify />} />
						<Route path="confirm" element={<Confirm />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="setup" element={<SetupLayout />}>
							<Route path="profile" element={<SetupProfile />} />
							<Route path="accounts" element={<SetupAccounts />} />
						</Route>
						{/* <Route path="transactions" element={<Transactions />} />
						<Route path="balances" element={<Balances />} />
						<Route path="settings" element={<Settings />} />
						 */}
					</Route>
				</Routes>
			</RecoilRoot>
		</div>
	);
}

export default App;
