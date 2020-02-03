import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCow, faSquirrel, faHandHoldingUsd } from "@fortawesome/pro-duotone-svg-icons";

export default function() {
  return (
    <div className="inline-flex items-center">
      <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" color="white" />
      <div className="brand ml-2">foster</div>
    </div>
  );
}
