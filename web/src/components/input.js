import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

export default function(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6">
      <label htmlFor={props.id} className="font-bold block my-1">
        {props.label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={props.type === "password" && !showPassword ? "password" : "text"}
          className="w-full bg-white text-md p-2 border-gray-400 border-2 rounded shadow-inner focus:outline-none focus:shadow-outline block appearance-none leading-normal"
        />
        {props.type && props.type === "password" ? (
          <button
            type="button"
            className="absolute cursor-pointer top-0 right-0 p-3"
            onClick={() => setShowPassword(!showPassword)}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} color="gray" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function Submit(props) {
  // disabled, loading, error classes
  return (
    <button
      {...props}
      loading={props.loading ? "true" : undefined}
      type="submit"
      className="block rounded font-bold bg-green-500 hover:bg-green-600 cursor-pointer text-white border-green-700 border-2 py-2 px-4 shadow">
      {props.loading ? (
        <FontAwesomeIcon icon={faSpinnerThird} spin />
      ) : (
        <div className="flex items-center">
          {props.icon ? <FontAwesomeIcon icon={props.icon} /> : null}
          {props.text}
        </div>
      )}
    </button>
  );
}
