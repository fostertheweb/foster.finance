import React from "react";
import * as luxon from "luxon";
import classNames from "classnames";
import Loading from "./loading";

function Day({ number, isInCurrentMonth, isToday, data }) {
  const day = ["box-border border-gray-400 border-r border-b flex-1 relative"];

  return (
    <div
      className={classNames(
        ...day,
        isInCurrentMonth ? "bg-white" : "bg-gray-200",
        isToday ? "bg-purple-100 text-purple-800 font-bold" : "text-gray-600",
      )}>
      <span className="float-right m-1">{number}</span>
      {data ? (
        <ul className="list-none m-2 float-left text-xs font-medium">
          {data.map(t => {
            const amount = String(t.amount);
            const isNegative = amount.charAt(0) === "-";
            return (
              <li
                key={t.transaction_id}
                className={`mb-1 ${isNegative ? "text-red-600" : "text-green-600"}`}>
                {isNegative ? null : "+"}
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                  amount,
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function Week({ days }) {
  return <div className="flex flex-1">{days}</div>;
}

export function Calendar({ year, month, loading, data }) {
  let weeks = [];
  let key = 0;
  let number = 1;
  let maxRows = 5;

  if (loading) {
    return <Loading />;
  }

  if (getFirstWeekday(year, month) === 7) {
    maxRows = 6;
  }

  for (let row = 0; row < maxRows; row++) {
    let week = [];

    for (let weekday = 1; weekday < 8; weekday++) {
      if (row === 0 && weekday === 6 && weekday === getFirstWeekday(year, month)) {
        const calendarDate = luxon.DateTime.local(year, month, number);
        const transactions = data ? data.filter(t => compareDates(t.date, calendarDate)) : [];
        week.push(
          <Day
            number={number}
            isInCurrentMonth={true}
            isToday={isToday(year, month, number)}
            data={transactions}
            key={key}
          />,
        );
        number++;
        key++;
      } else if (row === 0 && weekday === 7 && weekday === getFirstWeekday(year, month)) {
        const calendarDate = luxon.DateTime.local(year, month, number);
        const transactions = data ? data.filter(t => compareDates(t.date, calendarDate)) : [];
        week.push(
          <Day
            number={number}
            isInCurrentMonth={true}
            isToday={isToday(year, month, number)}
            data={transactions}
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
        const calendarDate = luxon.DateTime.local(year, month, number);
        const transactions = data ? data.filter(t => compareDates(t.date, calendarDate)) : [];
        week.push(
          <Day
            number={number}
            isInCurrentMonth={true}
            isToday={isToday(year, month, number)}
            data={transactions}
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
    <div className="flex flex-col border-l border-gray-400 calendar">
      <div className="flex justify-around border-b border-gray-400 bg-white text-gray-700 weekdays">
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

function compareDates(transactionDate, calendarDate) {
  return transactionDate === calendarDate.toFormat("yyyy-MM-dd");
}
