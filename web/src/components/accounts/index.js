import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import AccountList from "./list";
import Loading from "../loading";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  const { user } = useAuth();
  const uid = user.attributes.sub;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const items = JSON.parse(localStorage.getItem(uid)) || [];
    async function getAccounts() {
      const response = await fetch(`${url}/plaid/accounts`, {
        method: "POST",
        body: JSON.stringify({ items }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const accounts = await response.json();
      setData(accounts);
      setLoading(false);
    }

    getAccounts();
  }, [uid]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <AccountList data={data} loading={loading} />
    </div>
  );
}
