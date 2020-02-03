import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

export default function(props) {
  // disabled, loading, error classes
  return (
    <button
      {...props}
      loading={props.loading ? "true" : undefined}
      type="button"
      className="block border rounded bg-green-500 hover:bg-green-600 cursor-pointer text-white border-green-700 border-1 py-3 px-5">
      {props.loading ? (
        <FontAwesomeIcon icon={faSpinnerThird} spin />
      ) : (
        <div className="flex items-center">
          {props.icon ? <FontAwesomeIcon icon={props.icon} className="mr-2" /> : null}
          {props.text}
        </div>
      )}
    </button>
  );
}
