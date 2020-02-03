import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Routes, Route, Outlet } from "react-router-dom";

import SignIn from "./components/signin";
import CreateAccount from "./components/create-account";
import CreateAccountProfile from "./components/create-account/profile";
import CreateAccountVerify from "./components/create-account/verify";

import { AuthProvider, useAuth } from "./hooks/use-auth";
import Header, { MinimalHeader } from "./components/header";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  request(operation) {
    operation.setContext({
      headers: {
        plaid: localStorage.getItem("plaid_access_token"),
      },
    });
  },
});

function Layout() {
  const { user } = useAuth();

  return (
    <div>
      {user ? <Header user={user} /> : <MinimalHeader />}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  return <h1>hello</h1>;
}

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="me" element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="create-account" element={<CreateAccount />} />
              <Route path="create-account/profile" element={<CreateAccountProfile />} />
              <Route path="create-account/verify" element={<CreateAccountVerify />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
