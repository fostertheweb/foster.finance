import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/pro-duotone-svg-icons";

export default function({ color }) {
  return (
    <div className="inline-flex items-center">
      <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" color={color || "white"} />
      <div className="brand ml-2 border-b-2 border-teal-500 hover:border-b-2 hover:border-white">
        foster
      </div>
    </div>
  );
}
