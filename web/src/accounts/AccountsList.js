import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import AccountCard from "./AccountCard";

const GET_ACCOUNTS = gql`
  {
    getAccounts {
      accounts {
        account_id
        name
        official_name
        mask
        type
        subtype
        balances {
          available
          current
        }
      }
    }
  }
`;

export default function() {
  const { data, loading, error } = useQuery(GET_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>Error</pre>;

  return (
    <div className="accounts-list">
      {data.getAccounts.accounts.map(account => (
        <AccountCard key={account.account_id} data={account} />
      ))}
    </div>
  );
}
