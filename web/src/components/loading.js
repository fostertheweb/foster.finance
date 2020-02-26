import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

export default function() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <FontAwesomeIcon size="6x" icon={faSpinnerThird} spin />
    </div>
  );
}
