import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationSquare } from "@fortawesome/pro-duotone-svg-icons";

export default function(props) {
  return (
    <div className="flex">
      <FontAwesomeIcon icon={faExclamationSquare} size="2x" />
      {props.error.message}
    </div>
  );
}
