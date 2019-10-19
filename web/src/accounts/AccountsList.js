import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_ACCOUNTS = gql`
  {
    getAccounts {
      accounts {
        name
      }
    }
  }
`;

export default function() {
  const { data, loading, error } = useQuery(GET_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error</pre>;

  return (
    <ul>
      {data.getAccounts.accounts.map(account => (
        <li>{account.name}</li>
      ))}
    </ul>
  );
}
