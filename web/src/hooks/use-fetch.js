import React from "react";
import * as luxon from "luxon";

const url = process.env.REACT_APP_API_ENDPOINT;

// const { user } = useAuth();
// const uid = user.attributes.sub;
const items = JSON.parse(localStorage.getItem(uid)) || [];

export function formatDateParams(year, month) {
  const zeroPad = number => (number.toString().length === 1 ? `0${number}` : number);
  const today = luxon.DateTime.local(year, month);
  const startDate = `${today.year}-${zeroPad(today.month)}-01`;
  const endDate = `${today.year}-${zeroPad(today.month)}-${today.daysInMonth}`;
  return { start_date: startDate, end_date: endDate };
}

async function getTransactions() {
  const response = await fetch(`${url}/plaid/transactions`, {
    method: "POST",
    body: JSON.stringify({ items, ...dateRange }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const transactions = await response.json();
  setData(transactions);
  setLoading(false);
}
