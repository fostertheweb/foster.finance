import React from "react";
import { faTimes, faInfoCircle, faLongArrowAltRight } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./logo";
import classNames from "classnames";

const single = ["sm:rounded", "sm:shadow", "sm:h-auto sm:w-1/2 md:w-1/3", "lg:w-1/4"];
const double = ["md:w-2/3", "lg:w-1/2"];
const leftSide = ["sm:border-r", "border-gray-200", "sm:w-1/2"];

export function Panel({ children, title }) {
	const isDouble = Array.isArray(children);

	return (
		<div className="flex items-center justify-center h-screen">
			<div
				className={`flex items-stretch justify-center flex-col-reverse sm:flex-row h-screen md:h-auto w-full ${
					isDouble ? classNames(double) : classNames(single)
				} bg-white md:rounded md:shadow`}>
				<div className={`p-6 w-full ${isDouble ? classNames(leftSide) : ""}`}>
					<div className="flex items-center justify-start">
						<Logo />
						<FontAwesomeIcon icon={faLongArrowAltRight} size="lg" className="ml-2 -mb-1 text-gray-400 fill-current" />
						<h2 className="ml-2 text-xl font-normal tracking-wide text-gray-500 smallcaps">{title}</h2>
					</div>
					{isDouble ? children[0] : children}
				</div>
				{isDouble ? (
					<div className="flex items-center justify-center w-full py-6 font-medium text-center text-green-500 bg-green-100 rounded-r sm:p-0 sm:w-1/2">
						{children[1]}
					</div>
				) : null}
			</div>
		</div>
	);
}
