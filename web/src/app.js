import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/use-auth";
import Layout from "./components/layout";
import Redirect from "./components/common/redirect";

import SignIn from "./components/sign-in";
import CreateAccount from "./components/create-account";
import Verify from "./components/verify";
import Settings from "./components/settings";
import EditProfile from "./components/settings/profile";
import EditExpenses from "./components/settings/expenses";
import EditAccounts from "./components/settings/accounts";
import Setup from "./components/setup";
import Profile from "./components/setup/profile";
import Expenses from "./components/setup/expenses";
import LinkAccounts from "./components/setup/accounts";
import Transactions from "./components/transactions";
import Balances from "./components/balances";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="verify" element={<Verify />} />
          <Route path="app" element={<Layout />}>
            <Route path="/" element={<Redirect to="transactions" />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="balances" element={<Balances />} />
            <Route path="settings" element={<Settings />}>
              <Route path="/" element={<Redirect to="profile" />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="accounts" element={<EditAccounts />} />
              <Route path="expenses" element={<EditExpenses />} />
            </Route>
            <Route path="setup" element={<Setup />}>
              <Route path="profile" element={<Profile />} />
              <Route path="accounts" element={<LinkAccounts />} />
              <Route path="expenses" element={<Expenses />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
