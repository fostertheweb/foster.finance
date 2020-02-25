import React, { useEffect } from "react";
import useFetch from "use-http";
import { useAuth } from "../../hooks/use-auth";
import AccountList from "./list";
import AddBank from "./add-bank";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  const { user } = useAuth();
  const { post, data } = useFetch(url);
  const uid = user.attributes.sub;
  const items = JSON.parse(localStorage.getItem(uid)) || [];

  useEffect(() => {
    async function fetch() {
      await post("/plaid/accounts", { items });
    }

    fetch();
  });

  return <div className="p-4">{data ? <AccountList data={data} /> : <AddBank />}</div>;
}
