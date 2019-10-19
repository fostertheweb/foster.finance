import React from "react";
import * as luxon from "luxon";

function getCurrentYear() {
  return luxon.DateTime.local().year;
}

function isToday(year, month, day) {
  return (
    luxon.DateTime.local().toLocaleString(luxon.DateTime.DATE_FULL) ===
    luxon.DateTime.local(year, month, day).toLocaleString(
      luxon.DateTime.DATE_FULL,
    )
  );
}

function Day({ number, isInCurrentMonth, isToday }) {
  return (
    <div className={isInCurrentMonth ? "day current-month" : "day"}>
      <span className={isToday ? "today" : ""}>{number}</span>
    </div>
  );
}

function Week({ days }) {
  return <div className="week">{days}</div>;
}

export function PayPeriod({ year, month, day }) {
  let weeks = [];
  let key = 0;
  let number = 1;
  let maxRows = 2;

  for (let row = 0; row < maxRows; row++) {
    let week = [];

    for (let weekday = 1; weekday < 8; weekday++) {
      week.push(
        <Day
          number={number}
          isInCurrentMonth={true}
          isToday={isToday(year, month, number)}
          key={key}
        />,
      );
      number++;
      key++;
    }
    weeks.push(<Week days={week} key={row} />);
  }

  return (
    <div className="calendar">
      <div className="weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>
      {weeks}
    </div>
  );
}
