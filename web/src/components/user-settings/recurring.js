import React, { useState, useEffect } from "react";
import * as luxon from "luxon";
import { useAuth } from "../../hooks/use-auth";
import Loading from "../loading";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  const { user } = useAuth();
  const uid = user.attributes.sub;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = luxon.DateTime.local();
  const end_date = today.toFormat("yyyy-MM-dd");
  const start_date = today.minus({ months: 3 }).toFormat("yyyy-MM-dd");

  useEffect(() => {
    async function getTransactions() {
      const items = JSON.parse(localStorage.getItem(uid)) || [];
      const response = await fetch(`${url}/plaid/expenses`, {
        method: "POST",
        body: JSON.stringify({ items, start_date, end_date }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const transactions = await response.json();
      setData(transactions);
      setLoading(false);
    }

    getTransactions();
    // eslint-disable-next-line
  }, [uid]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <ul>
        {Object.keys(data).map(dayOfMonth => (
          <li key={dayOfMonth}>
            {dayOfMonth} - {data[dayOfMonth].map(t => t.amount).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
