import React from "react";
import ApolloClient from "apollo-boost";
import { getAccessToken } from "./Plaid";
import { ApolloProvider } from "@apollo/react-hooks";
import Header from "./Header";
import { Router } from "@reach/router";
import { Accounts } from "./Accounts";
import { Expenses } from "./Expenses";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  request(operation) {
    operation.setContext({
      headers: {
        plaid: getAccessToken(),
      },
    });
  },
});

function Home() {
  return <div>Home</div>;
}

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Header />
        <Router className="panel">
          <Home path="/" />
          <Expenses path="expenses" />
          <Accounts path="accounts" />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
