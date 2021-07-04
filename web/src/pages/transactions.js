import React, { useState } from "react";
import * as luxon from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-duotone-svg-icons";
import { Calendar } from "components/calendar";
import { Select } from "components/common/input";
import { useTransactions } from "hooks/use-transactions";

export default function () {
	const [month, setMonth] = useState(luxon.DateTime.local().month);
	const year = luxon.DateTime.local().year;
	const months = luxon.Info.months().map((label, index) => ({
		label,
		value: index + 1,
	}));

	const [start, end] = currentMonth(year, month);
	const { data: transactions, status } = useTransactions(start.toFormat("yyyy-MM-dd"), end.toFormat("yyyy-MM-dd"));

	return (
		<div className="ff-pt-header">
			<div className="flex items-center w-full p-2 justify-evenly">
				<button className="">ok</button>
				<div>
					<button
						onClick={() => {
							setMonth(month - 1);
						}}
						className="p-2">
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
					<Select
						className=""
						value={month}
						options={months}
						onChange={(event) => {
							setMonth(Number(event.currentTarget.value));
						}}
					/>
					<button
						onClick={() => {
							setMonth(month + 1);
						}}
						className="p-2">
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				</div>
				<button className="">Today</button>
			</div>

			<Calendar year={year} month={month} loading={status === "loading"} data={transactions} />
		</div>
	);
}

function currentMonth(year, month) {
	const firstOfThisMonth = luxon.DateTime.local(year, month);
	const lastOfThisMonth = luxon.DateTime.local(year, month, firstOfThisMonth.daysInMonth);
	return [firstOfThisMonth, lastOfThisMonth];
}
