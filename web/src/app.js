import React from "react";
import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";

import SignIn from "./components/signin";
import CreateAccount from "./components/create-account";
import CreateAccountProfile from "./components/create-account/profile";
import CreateAccountVerify from "./components/create-account/verify";
import PersonalHome from "./components/account/home";
import AccountList from "./components/account/account-list";
import Expenses from "./components/expenses";

import { AuthProvider, useAuth } from "./hooks/use-auth";
import Header, { MinimalHeader } from "./components/header";

function ApplicationLayout() {
  const { user, loading, error } = useAuth();
  const navigate = useNavigate();

  if (loading) return <b>loading application...</b>;
  if (error) return <pre className="text-red-600">auth error</pre>;
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
  const location = useLocation();

  return (
    <div>
      <MinimalHeader />
      <div className="p-4">{location.pathname === "/" ? <PublicHome /> : <Outlet />}</div>
    </div>
  );
}

function PublicHome() {
  return (
    <div>
      <h2>welcome</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quo quod nulla cum
        voluptatem vel magnam? Laborum veniam voluptatibus saepe temporibus eos, nemo doloribus
        facilis nostrum aut et, doloremque possimus.
      </p>
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
            <Route path="home" element={<PersonalHome />} />
            <Route path="banks" element={<AccountList />} />
            <Route path="calendar" element={<Expenses />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
