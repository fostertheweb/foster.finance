import React, { useEffect, useState } from "react";
import { Calendar } from "./calendar";
import * as luxon from "luxon";
import useFetch from "use-http";
import { useAuth } from "../hooks/use-auth";
import { Select } from "./input";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  const [month, setMonth] = useState(luxon.DateTime.local().month);
  const months = luxon.Info.months().map((label, index) => ({
    label,
    value: index + 1,
  }));
  const [year, setYear] = useState(luxon.DateTime.local().year);
  const years = [2020, 2019, 2018, 2017];
  const [dateRange, setDateRange] = useState(formatDateParams(year, month));
  const { user } = useAuth();
  const { post, data, loading } = useFetch(url);
  const uid = user.attributes.sub;
  const items = JSON.parse(localStorage.getItem(uid)) || [];

  useEffect(() => {
    async function fetch() {
      await post("/plaid/transactions", { items, ...dateRange });
    }

    fetch();
    // eslint-disable-next-line
  }, [dateRange]);

  return (
    <div className="ff-container flex items-center">
      <div className="p-2 self-start">
        <div className="flex items-center">
          <Select
            value={month}
            options={months}
            onChange={event => {
              setMonth(Number(event.currentTarget.value));
              setDateRange(formatDateParams(year, Number(event.currentTarget.value)));
            }}
          />
          &nbsp;
          <Select
            value={year}
            options={years}
            onChange={event => {
              setYear(Number(event.currentTarget.value));
              setDateRange(formatDateParams(Number(event.currentTarget.value), month));
            }}
          />
        </div>
      </div>
      <div className="flex-grow">
        <Calendar year={year} month={month} loading={loading} data={data} />
      </div>
    </div>
  );
}

function formatDateParams(year, month) {
  const zeroPad = number => (number.toString().length === 1 ? `0${number}` : number);
  const today = luxon.DateTime.local(year, month);
  const startDate = `${today.year}-${zeroPad(today.month)}-01`;
  const endDate = `${today.year}-${zeroPad(today.month)}-${today.daysInMonth}`;
  return { start_date: startDate, end_date: endDate };
}
