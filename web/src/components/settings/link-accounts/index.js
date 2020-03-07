import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import AccountList from "./list";
import Alert from "../../alert";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  const { user } = useAuth();
  const uid = user.attributes.sub;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const items = JSON.parse(localStorage.getItem(uid)) || [];
    async function getAccounts() {
      try {
        const response = await fetch(`${url}/plaid/accounts`, {
          method: "POST",
          body: JSON.stringify({ items }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const accounts = await response.json();
        setData(accounts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getAccounts();
  }, [uid]);

  if (error) {
    return <Alert message={error.message} />;
  }

  return <AccountList data={data} loading={loading} />;
}
