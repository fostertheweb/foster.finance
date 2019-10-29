import React from "react";
import * as luxon from "luxon";

function getCurrentMonth() {
  return luxon.DateTime.local().month;
}

function getDaysInMonth(year, month) {
  if (year && month) {
    return luxon.DateTime.local(year, month).daysInMonth;
  }

  return luxon.DateTime.local().daysInMonth;
}

function getCurrentYear() {
  return luxon.DateTime.local().year;
}

function getFirstWeekday(year, month) {
  if (year && month) {
    return luxon.DateTime.local(year, month, 1).weekday;
  }

  return luxon.DateTime.local(getCurrentYear(), getCurrentMonth(), 1).weekday;
}

function isToday(year, month, day) {
  return (
    luxon.DateTime.local().toLocaleString(luxon.DateTime.DATE_FULL) ===
    luxon.DateTime.local(year, month, day).toLocaleString(luxon.DateTime.DATE_FULL)
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

export function Calendar({ year, month }) {
  let weeks = [];
  let key = 0;
  let number = 1;
  let maxRows = 5;

  if (getFirstWeekday(year, month) === 7) {
    maxRows = 6;
  }

  for (let row = 0; row < maxRows; row++) {
    let week = [];

    for (let weekday = 1; weekday < 8; weekday++) {
      if (row === 0 && weekday === 6 && weekday === getFirstWeekday(year, month)) {
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
      } else if (row === 0 && weekday === 7 && weekday === getFirstWeekday(year, month)) {
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
      } else if (row === 0 && weekday < getFirstWeekday(year, month)) {
        week.push(<Day number={""} isInCurrentMonth={false} isToday={false} key={key} />);
        key++;
      } else if (number > getDaysInMonth(year, month)) {
        week.push(<Day number={""} isInCurrentMonth={false} isToday={false} key={key} />);
        key++;
      } else {
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
