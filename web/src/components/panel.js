import React from "react";
import { faLongArrowAltRight } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./logo";
import classNames from "classnames";

const single = ["sm:rounded", "sm:shadow", "sm:h-auto sm:w-1/2 md:w-1/3", "lg:w-1/4"];
const double = ["md:w-2/3", "lg:w-1/2"];
const leftSide = ["sm:border-r", "border-gray-200", "sm:w-1/2"];

export function Panel({ children, title }) {
  const isDouble = Array.isArray(children);

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className={`flex items-stretch justify-center flex-col-reverse sm:flex-row h-screen md:h-auto w-full ${
          isDouble ? classNames(double) : classNames(single)
        } bg-white md:rounded md:shadow`}>
        <div className={`p-6 w-full ${isDouble ? classNames(leftSide) : ""}`}>
          <div className="flex items-center justify-start">
            <Logo />
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              size="lg"
              className="text-gray-400 fill-current ml-2 -mb-1"
            />
            <h2 className="text-gray-500 tracking-wide font-normal smallcaps text-xl ml-2">
              {title}
            </h2>
          </div>
          {isDouble ? children[0] : children}
        </div>
        {isDouble ? (
          <div className="py-6 sm:p-0 w-full sm:w-1/2 rounded-r bg-green-100 text-green-500 text-center font-medium flex items-center justify-center">
            {children[1]}
          </div>
        ) : null}
      </div>
    </div>
  );
}
