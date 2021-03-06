import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "components/layout";
import Dashboard from "pages/dashboard";
import Transactions from "pages/transactions";
import Balances from "pages/balances";

const queryClient = new QueryClient();

function App() {
	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<Dashboard />} />
						<Route path="transactions" element={<Transactions />} />
						<Route path="balances" element={<Balances />} />
					</Route>
				</Routes>
			</QueryClientProvider>
		</div>
	);
}

export default App;
