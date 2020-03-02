import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import Error from "./components/error";
import Loading from "./components/loading";
import Header from "./components/header";
import PublicHeader from "./components/header/public-header";
import SignIn from "./components/signin";
// sign up
import CreateAccount from "./components/create-account";
import CreateAccountVerify from "./components/create-account/verify";
// user settings
import Settings from "./components/user-settings";
import Profile from "./components/user-settings/profile";
import Recurring from "./components/user-settings/recurring";
import BankAccounts from "./components/user-settings/bank-accounts";
// application routes
import Setup from "./components/setup";
import Home from "./components/home";
import Expenses from "./components/expenses";

function ApplicationLayout() {
  const { user, loading, error } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!user) {
    navigate("/signin");
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function PublicLayout() {
  return (
    <div>
      <PublicHeader />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="create-account/verify" element={<CreateAccountVerify />} />
          </Route>
          <Route path="app" element={<ApplicationLayout />}>
            <Route path="setup" element={<Setup />}>
              <Route path="profile" element={<Profile />} />
              <Route path="bank-accounts" element={<BankAccounts />} />
              <Route path="recurring" element={<Recurring />} />
            </Route>
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="expenses" element={<Expenses />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
