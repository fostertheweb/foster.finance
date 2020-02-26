import React, { useState } from "react";
import { Divider, HTMLSelect } from "@blueprintjs/core";
import { Calendar } from "./calendar";
import * as luxon from "luxon";

export default function() {
  const [month, setMonth] = useState(luxon.DateTime.local().month);
  const months = luxon.Info.months().map((month, index) => ({
    label: month,
    value: index + 1,
  }));

  const [year, setYear] = useState(luxon.DateTime.local().year);
  const years = [2020, 2019, 2018, 2017];

  return (
    <div className="ff-container flex items-center">
      <div className="py-2 px-4 self-start">
        <div className="flex items-center">
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
      </div>
      <div className="flex-grow">
        <Calendar year={year} month={month} />
      </div>
    </div>
  );
}
