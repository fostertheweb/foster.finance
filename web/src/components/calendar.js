import React from "react";
import * as luxon from "luxon";
import classNames from "classnames";
import Loading from "./common/loading";

function Day({ number, isInCurrentMonth, isToday, data }) {
	return (
		<div
			className={classNames(
				isInCurrentMonth ? "bg-white" : "bg-gray-200",
				isToday ? "bg-purple-100 text-purple-800 font-bold" : "text-gray-600",
			)}>
			<span className="float-right m-1">{number}</span>
			{data ? (
				<ul className="float-left m-2 text-xs font-medium list-none">
					{data.map((t) => {
						const amount = String(t.amount);
						const isNegative = amount.charAt(0) === "-";
						return (
							<li key={t.transaction_id} className={`mb-1 ${isNegative ? "text-red-600" : "text-green-600"}`}>
								{isNegative ? null : "+"}
								{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
}

function Week({ days }) {
	return days;
}

export function Calendar({ year, month, loading, data }) {
	const daysInMonth = getDaysInMonth(year, month);
	const firstWeekday = getFirstWeekday(year, month);

	console.log({ daysInMonth });
	console.log({ firstWeekday });

	return (
		<div className="grid grid-cols-7 border-b border-gray-300">
			{Array.from({ length: firstWeekday }, () => (
				<div className="bg-gray-200 border-t border-r border-gray-300"></div>
			))}
			{Array.from({ length: daysInMonth }, (_, index) => {
				const weekday = getWeekday(year, month, index);

				return (
					<div
						className={classNames(
							"h-16 border-gray-300",
							weekday > 0 && weekday < 6 ? "border-r border-t border-gray-300" : "border-r-0",
							isToday(year, month, index) ? "bg-purple-100 text-purple-800 font-bold" : "bg-white text-gray-600",
						)}></div>
				);
			})}
		</div>
	);
}

export function OldCalendar({ year, month, loading, data }) {
	let weeks = [];
	let key = 0;
	let number = 1;
	let weeksInMonth = 5;

	const firstWeekOfMonth = 0;
	const firstDayOfWeek = 0;
	const lastDayOfWeek = 6;
	const firstDayOfWeekend = 6;

	if (loading) {
		return <Loading />;
	}

	// month starts on friday, or saturday and has 31 days
	if (getFirstWeekday(year, month) >= lastDayOfWeek - 1 && getDaysInMonth(year, month) > 30) {
		weeksInMonth = 6;
	}

	// month starts on saturday and has 30 or more days
	if (getFirstWeekday(year, month) === lastDayOfWeek && getDaysInMonth(year, month) > 29) {
		weeksInMonth = 6;
	}

	for (let week = firstWeekOfMonth; week < weeksInMonth; week++) {
		let days = [];

		for (let weekday = firstDayOfWeek; weekday <= lastDayOfWeek; weekday++) {
			if (week === firstWeekOfMonth && weekday === firstDayOfWeekend && weekday === getFirstWeekday(year, month)) {
				const calendarDate = luxon.DateTime.local(year, month, number);
				const transactions = data ? data.filter((t) => compareDates(t.date, calendarDate)) : [];
				const props = buildProps(number, true, isToday(year, month, number), transactions, key);
				days.push(props);
				number++;
				key++;
			} else if (week === firstWeekOfMonth && weekday === lastDayOfWeek && weekday === getFirstWeekday(year, month)) {
				const calendarDate = luxon.DateTime.local(year, month, number);
				const transactions = data ? data.filter((t) => compareDates(t.date, calendarDate)) : [];
				const props = buildProps(number, true, isToday(year, month, number), transactions, key);
				days.push(props);
				number++;
				key++;
			} else if (week === 0 && weekday < getFirstWeekday(year, month)) {
				const props = buildProps("", false, false, null, key);
				days.push(props);
				key++;
			} else if (number > getDaysInMonth(year, month)) {
				const props = buildProps("", false, false, null, key);
				days.push(props);
				key++;
			} else {
				const calendarDate = luxon.DateTime.local(year, month, number);
				const transactions = data ? data.filter((t) => compareDates(t.date, calendarDate)) : [];
				const props = buildProps(number, true, isToday(year, month, number), transactions, key);
				days.push(props);
				number++;
				key++;
			}
		}

		weeks.push(
			<Week
				days={days.map((props) => (
					<Day {...props} />
				))}
				key={week}
			/>,
		);
	}

	return (
		<div className="grid grid-cols-7 divide-x divide-y divide-gray-300">
			<div className="py-1">Su</div>
			<div className="py-1">M</div>
			<div className="py-1">Tu</div>
			<div className="py-1">W</div>
			<div className="py-1">Th</div>
			<div className="py-1">F</div>
			<div className="py-1">Sa</div>
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
		const weekday = luxon.DateTime.local(year, month, 1).weekday;
		return weekday === 7 ? 0 : weekday;
	}

	const weekday = luxon.DateTime.local(getCurrentYear(), getCurrentMonth(), 1).weekday;
	return weekday === 7 ? 0 : weekday;
}

function getWeekday(year, month, day) {
	return luxon.DateTime.local(year, month, 1).weekday;
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

function buildProps(number, isInCurrentMonth, isToday, data, key) {
	return { number, isInCurrentMonth, isToday, data, key };
}
