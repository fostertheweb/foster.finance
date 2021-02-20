import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// Application Layout
import Layout from "components/layout";
// Public Pages
import SignIn from "pages/public/sign-in";
import CreateAccount from "pages/public/create-account";
import Verify from "pages/public/verify-email";
import Confirm from "pages/public/confirm-email";
// Application Pages
import Dashboard from "pages/dashboard";
import Transactions from "pages/transactions";
import Balances from "pages/balances";
// Setup
import SetupLayout from "components/setup";
import SetupProfile from "components/setup/profile";
import SetupAccounts from "components/setup/accounts";
import SetupExpenses from "components/setup/expenses";
// Settings
import SettingsLayout from "components/settings";
import SettingsAccounts from "components/setup/accounts";
import SettingsProfile from "components/settings/profile";
import SettingsExpenses from "components/settings/expenses";

const queryClient = new QueryClient();

function App() {
	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<SignIn />} />
						<Route path="join" element={<CreateAccount />} />
						<Route path="verify" element={<Verify />} />
						<Route path="confirm" element={<Confirm />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="transactions" element={<Transactions />} />
						<Route path="balances" element={<Balances />} />
						<Route path="setup" element={<SetupLayout />}>
							<Route path="profile" element={<SetupProfile />} />
							<Route path="accounts" element={<SetupAccounts />} />
							<Route path="expenses" element={<SetupExpenses />} />
						</Route>
						<Route path="settings" element={<SettingsLayout />}>
							<Route path="profile" element={<SettingsProfile />} />
							<Route path="accounts" element={<SettingsAccounts />} />
							<Route path="expenses" element={<SettingsExpenses />} />
						</Route>
					</Route>
				</Routes>
			</QueryClientProvider>
		</div>
	);
}

export default App;
