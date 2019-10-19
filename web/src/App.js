import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Header from "./layout/Header";
import { Router } from "@reach/router";
import Accounts from "./routes/Accounts";
import Expenses from "./routes/Expenses";

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
  return <div>Home</div>;
}

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Header />
        <Router>
          <Home path="/" />
          <Expenses path="expenses" />
          <Accounts path="accounts" />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
