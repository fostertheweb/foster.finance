import React from "react";
import { faLongArrowAltRight } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./logo";

export default function({ title }) {
  return (
    <div className="flex items-center justify-start">
      <Logo />
      <FontAwesomeIcon
        icon={faLongArrowAltRight}
        size="lg"
        className="text-gray-400 fill-current ml-2 -mb-1"
      />
      <h2 className="text-gray-500 tracking-wide font-normal smallcaps text-xl ml-2">{title}</h2>
    </div>
  );
}
