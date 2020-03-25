import React, { useEffect, useState } from "react";
import { Calendar } from "./calendar";
import * as luxon from "luxon";
import { Select } from "./input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-duotone-svg-icons";
import useAPI from "../hooks/use-api";

export default function() {
  const { state, get } = useAPI();
  const [month, setMonth] = useState(luxon.DateTime.local().month);
  const year = luxon.DateTime.local().year;

  const months = luxon.Info.months().map((label, index) => ({
    label,
    value: index + 1,
  }));

  function currentMonth() {
    const firstOfThisMonth = luxon.DateTime.local(year, month);
    const lastOfThisMonth = luxon.DateTime.local(year, month, firstOfThisMonth.daysInMonth);
    return [firstOfThisMonth, lastOfThisMonth];
  }

  useEffect(() => {
    const [start, end] = currentMonth();

    if (state.matches("idle")) {
      get("/transactions", {
        start_date: start.toFormat("yyyy-MM-dd"),
        end_date: end.toFormat("yyyy-MM-dd"),
      });
    }

    //eslint-disable-next-line
  }, [state, month, year]);

  return (
    <div className="ff-container ff-pt-header flex items-start">
      <div className="p-2">
        <div className="flex items-center bg-white border border-gray-400 rounded">
          <button
            onClick={() => {
              setMonth(month - 1);
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
            }}
          />
          <button
            onClick={() => {
              setMonth(month + 1);
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
        <Calendar
          year={year}
          month={month}
          loading={state.matches("loading")}
          data={state.context.data}
        />
      </div>
    </div>
  );
}
