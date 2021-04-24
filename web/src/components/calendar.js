import React from "react";
import * as luxon from "luxon";
import classNames from "classnames";

export function Calendar({ year, month, loading, data }) {
	const daysInMonth = getDaysInMonth(year, month);
	const firstWeekday = getFirstWeekday(year, month);
	const lastWeekday = getWeekday(year, month, daysInMonth);

	return (
		<div className="grid grid-cols-7 border-b border-gray-300">
			{Array.from({ length: firstWeekday }, () => (
				<div className="bg-gray-200 border-t border-r border-gray-300"></div>
			))}
			{Array.from({ length: daysInMonth }, (_, index) => {
				const day = index + 1;
				const weekday = getWeekday(year, month, day);

				console.log({ day, weekday });

				return (
					<div
						className={classNames(
							"relative h-16 border-t border-gray-300 hover:bg-indigo-100 cursor-pointer",
							weekday < 6 || weekday === 7 ? "border-r" : "border-r-0",
							isToday(year, month, day) ? "bg-purple-100 text-purple-800 font-bold" : "bg-white text-gray-600",
						)}>
						<span className="float-right m-1 text-sm">{day}</span>
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
			})}
			{Array.from({ length: 6 - lastWeekday }, () => (
				<div className="bg-gray-200 border-t border-gray-300"></div>
			))}
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
	return luxon.DateTime.local(year, month, day).weekday;
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
