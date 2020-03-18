import React, { useEffect, useState } from "react";
import { Calendar } from "./calendar";
import * as luxon from "luxon";
import { useAuth } from "../hooks/use-auth";
import { Select } from "./input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-duotone-svg-icons";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  // get user id and stored tokens
  const { user } = useAuth();
  const uid = user.attributes.sub;

  // local component state
  const [month, setMonth] = useState(luxon.DateTime.local().month);
  const year = luxon.DateTime.local().year;
  const [dateRange, setDateRange] = useState(formatDateParams(year, month));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // setup dropdown options
  const months = luxon.Info.months().map((label, index) => ({
    label,
    value: index + 1,
  }));

  useEffect(() => {
    async function getTransactions() {
      const items = JSON.parse(localStorage.getItem(uid)) || [];
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

    getTransactions();
    // eslint-disable-next-line
  }, [uid, dateRange]);

  return (
    <div className="ff-container ff-pt-header flex items-center">
      <div className="p-2 self-start">
        <div className="flex items-center bg-white border border-gray-400 rounded">
          <button
            onClick={() => {
              setMonth(month - 1);
              setDateRange(formatDateParams(year, month - 1));
            }}
            className="text-base text-gray-500 px-2 py-1 m-1 rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <Select
            className="text-gray-700 font-medium appearance-none bg-transparent py-1 px-4 border-l border-r border-gray-300 focus:outline-none focus:shadow-outline"
            value={month}
            options={months}
            onChange={event => {
              setMonth(Number(event.currentTarget.value));
              setDateRange(formatDateParams(year, Number(event.currentTarget.value)));
            }}
          />
          <button
            onClick={() => {
              setMonth(month + 1);
              setDateRange(formatDateParams(year, month + 1));
            }}
            className="text-base text-gray-500 px-2 py-1 m-1 rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div>
          <div className="pb-1 font-medium text-gray-700 border-b border-gray-300 mt-4">
            Accounts
          </div>
          <div></div>
        </div>
      </div>
      <div className="flex-grow">
        <Calendar year={year} month={month} loading={loading} data={data} />
      </div>
    </div>
  );
}

export function formatDateParams(year, month) {
  const currentDate = luxon.DateTime.local(year, month);
  const startDate = currentDate.toFormat("yyyy-MM-dd");
  const endDate = luxon.DateTime.local(year, month, currentDate.daysInMonth).toFormat("yyyy-MM-dd");
  return { start_date: startDate, end_date: endDate };
}
