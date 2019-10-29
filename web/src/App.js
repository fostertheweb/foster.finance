import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Router } from "@reach/router";

import Header from "./layout/Header";
import Accounts from "./routes/Accounts";
import Expenses from "./routes/Expenses";
import Login from "./users/Login";
import Signup from "./users/Signup";

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

function Home() {
  return (
    <div>
      <Header />
      <div>Home</div>
    </div>
  );
}

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <Home path="/" />
          <Expenses path="expenses" />
          <Accounts path="accounts" />
          <Login path="login" />
          <Signup path="signup" />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
