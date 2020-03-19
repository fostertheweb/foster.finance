import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/use-auth";
import { ProfileProvider } from "./hooks/use-profile";
import Layout from "./components/layout";
import Redirect from "./components/redirect";

import SignIn from "./components/signin";
import CreateAccount from "./components/create-account";
import Verify from "./components/create-account/verify";
import Settings from "./components/settings";
import Profile from "./components/settings/profile";
import Expenses from "./components/settings/expenses";
import LinkAccounts from "./components/settings/accounts";
import Setup from "./components/setup";
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
          <ProfileProvider>
            <Route path="app" element={<Layout />}>
              <Route path="/" element={<Redirect to="transactions" />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="balances" element={<Balances />} />
              <Route path="settings" element={<Settings />}>
                <Route path="/" element={<Redirect to="profile" />} />
                <Route path="profile" element={<Profile editing={true} />} />
                <Route path="accounts" element={<LinkAccounts editing={true} />} />
                <Route path="expenses" element={<Expenses editing={true} />} />
              </Route>
              <Route path="setup" element={<Setup />}>
                <Route path="profile" element={<Profile />} />
                <Route path="accounts" element={<LinkAccounts />} />
                <Route path="expenses" element={<Expenses />} />
              </Route>
            </Route>
          </ProfileProvider>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
