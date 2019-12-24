import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Router, navigate } from "@reach/router";
import { Button, Intent } from "@blueprintjs/core";

import SetupCredentials from "./components/signup/setup-credentials";
import SetupProfile from "./components/signup/setup-profile";
import LoginForm from "./components/login/form";

import Header from "./components/header";
import Accounts from "./routes/accounts";
import Expenses from "./routes/expenses";
import Login from "./routes/login";
import Signup from "./routes/signup";
import { AuthProvider, useAuth } from "./hooks/use-auth";

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
  const { signOut } = useAuth();

  return (
    <div>
      <Header />
      <div>Home</div>
      <Button intent={Intent.PRIMARY} onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}

function Application({ children }) {
  const { user } = useAuth();

  if (user.loading) {
    return null;
  }

  if (!user.data) {
    navigate("/login");
    return null;
  }

  return children;
}

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Router>
            <Application path="/">
              <Home path="/" />
              <Expenses path="expenses" />
              <Accounts path="accounts" />
            </Application>
            <Login path="login">
              <LoginForm path="/" />
            </Login>
            <Signup path="signup">
              <SetupCredentials path="/" />
              <SetupProfile path="profile" />
            </Signup>
          </Router>
        </AuthProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
