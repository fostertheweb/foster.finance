import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import Error from "./components/error";
import Loading from "./components/loading";
import Header from "./components/header";
import SignIn from "./components/signin";
// sign up
import CreateAccount from "./components/create-account";
import CreateAccountVerify from "./components/create-account/verify";
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

function Layout({ needsUser, dark }) {
  const { user, loading, error } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!user && needsUser) {
    navigate("/signin");
  }

  return (
    <div>
      <Header dark={dark} />
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
          <Route path="/" element={<Layout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="create-account/verify" element={<CreateAccountVerify />} />
          </Route>
          {/* Application Routes - require authentication */}
          <Route path="app" element={<Layout dark needsUser />}>
            <Route path="home" element={<Home />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="balances" element={<Balances />} />
            <Route path="settings" element={<Settings />}>
              <Route path="/" element={<Redirect to="profile" />} />
              <Route path="profile" element={<Profile editing={true} />} />
              <Route path="accounts" element={<LinkAccounts />} />
              <Route path="expenses" element={<Recurring />} />
            </Route>
            <Route path="setup" element={<Setup />}>
              <Route path="profile" element={<Profile />} />
              <Route path="link" element={<LinkAccounts />} />
              <Route path="recurring" element={<Recurring />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
