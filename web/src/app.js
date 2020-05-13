import React from "react";
import { Routes, Route } from "react-router-dom";
import { AmplifyAuthProvider } from "./hooks/use-amplify-auth";
import Layout from "./components/layout";
import Redirect from "./components/common/redirect";
import SignIn from "./components/sign-in";
import CreateAccount from "./components/create-account";
import Verify from "./components/verify";
import Settings from "./components/settings";
import Setup from "./components/setup";
import Transactions from "./components/transactions";
import Balances from "./components/balances";

function App() {
  return (
    <div>
      <AmplifyAuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="verify" element={<Verify />} />
          <Route path="app" element={<Layout />}>
            <Route path="/" element={<Redirect to="transactions" />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="balances" element={<Balances />} />
            <Route path="settings" element={<Settings />} />
            <Route path="setup" element={<Setup />} />
          </Route>
        </Routes>
      </AmplifyAuthProvider>
    </div>
  );
}

export default App;
