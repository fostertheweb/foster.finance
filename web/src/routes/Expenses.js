import React, { useState } from "react";
import { Divider, HTMLSelect } from "@blueprintjs/core";
import { Calendar } from "../expenses/Calendar";
import * as luxon from "luxon";

export default function() {
  const [month, setMonth] = useState(luxon.DateTime.local().month);
  const months = luxon.Info.months().map((month, index) => ({
    label: month,
    value: index + 1,
  }));

  const [year, setYear] = useState(luxon.DateTime.local().year);
  const years = [2019, 2018, 2017];

  return (
    <div className="expenses">
      <div className="sidebar">
        <div className="controls">
          <HTMLSelect
            value={month}
            options={months}
            onChange={event => setMonth(Number(event.currentTarget.value))}
          />
          <Divider />
          <HTMLSelect
            value={year}
            options={years}
            onChange={event => setYear(Number(event.currentTarget.value))}
          />
        </div>
        <Divider />
        <div>Income this month:</div>
        <Divider />
        <div>Spent this month:</div>
        <Divider />
        <div>Upcoming expenses:</div>
      </div>
      <div className="content">
        <Calendar year={year} month={month} />
      </div>
    </div>
  );
}
