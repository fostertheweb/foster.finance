import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

export default function({ size, color }) {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <FontAwesomeIcon size={size || `6x`} color={color || `#cbd5e0`} icon={faSpinnerThird} spin />
    </div>
  );
}
