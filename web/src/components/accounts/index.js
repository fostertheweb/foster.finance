import React, { useEffect } from "react";
import useFetch from "use-http";
import { useAuth } from "../../hooks/use-auth";
import AccountList from "./list";
import AddBank from "./add-bank";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  const { user } = useAuth();
  const { post, data, loading } = useFetch(url);
  const uid = user.attributes.sub;
  const items = JSON.parse(localStorage.getItem(uid)) || [];

  useEffect(() => {
    async function fetch() {
      await post("/plaid/accounts", { items });
    }

    fetch();
  });

  if (loading) {
    return <b>loading accounts...</b>;
  }

  return (
    <div className="p-4">{data && data.length > 1 ? <AccountList data={data} /> : <AddBank />}</div>
  );
}
