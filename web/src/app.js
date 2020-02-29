import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

import Home from "./components/home";
import SignIn from "./components/signin";
import CreateAccount from "./components/create-account";
import CreateAccountProfile from "./components/create-account/profile";
import CreateAccountVerify from "./components/create-account/verify";
import Accounts from "./components/accounts";
import Expenses from "./components/expenses";

import Error from "./components/error";
import Loading from "./components/loading";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import Header from "./components/header";
import PublicHeader from "./components/header/public-header";

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
            <Route path="create-account/profile" element={<CreateAccountProfile />} />
            <Route path="create-account/verify" element={<CreateAccountVerify />} />
          </Route>
          <Route path="app" element={<ApplicationLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="expenses" element={<Expenses />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
