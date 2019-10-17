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

function getYear() {
  return luxon.DateTime.local().year;
}

function getFirstWeekday(year, month) {
  if (year && month) {
    return luxon.DateTime.local(year, month, 1).weekday;
  }

  return luxon.DateTime.local(getYear(), getCurrentMonth(), 1).weekday;
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
  let number = 1;
  const monthLong = luxon.DateTime.local(year, month).monthLong;

  for (let cell = 0; cell < 5; cell++) {
    let week = [];

    for (let weekday = 0; weekday < 7; weekday++) {
      if (cell === 0 && weekday < getFirstWeekday(year, month)) {
        week.push(<Day number={""} isInCurrentMonth={false} isToday={false} />);
      } else if (number > getDaysInMonth(year, month)) {
        week.push(<Day number={""} isInCurrentMonth={false} isToday={false} />);
      } else {
        week.push(<Day number={number} isInCurrentMonth={true} isToday={isToday(year, month, number)} />);
        number++;
      }
    }

    weeks.push(<Week days={week} />);
  }

  return (
    <div className="calendar">
      <div className="month">{monthLong}</div>
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
