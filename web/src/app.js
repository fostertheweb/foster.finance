import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import Error from "./components/error";
import Loading from "./components/loading";
import Header from "./components/header";
import SignIn from "./components/signin";
// sign up
import CreateAccount from "./components/create-account";
import Verify from "./components/create-account/verify";
// user settings
import Settings from "./components/settings";
import Profile from "./components/settings/profile";
import Recurring from "./components/settings/recurring";
import LinkAccounts from "./components/settings/link-accounts";
// application routes
import Setup from "./components/setup";
import Home from "./components/home";
import Expenses from "./components/expenses";
import Balances from "./components/balances";

function Layout() {
  const { user, loading, error } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!user) {
    navigate("/");
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function Redirect({ to }) {
  const navigate = useNavigate();
  navigate(to);
  return <></>;
}

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="verify" element={<Verify />} />
          {/* Application Routes - require authentication */}
          <Route path="app" element={<Layout dark />}>
            <Route path="home" element={<Home />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="balances" element={<Balances />} />
            <Route path="settings" element={<Settings />}>
              <Route path="/" element={<Redirect to="profile" />} />
              <Route path="profile" element={<Profile editing={true} />} />
              <Route path="accounts" element={<LinkAccounts editing={true} />} />
              <Route path="expenses" element={<Recurring editing={true} />} />
            </Route>
            <Route path="setup" element={<Setup />}>
              <Route path="profile" element={<Profile />} />
              <Route path="accounts" element={<LinkAccounts />} />
              <Route path="expenses" element={<Recurring />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
