import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

export default function(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6">
      <label htmlFor={props.id} className="font-medium block my-1">
        {props.label}
      </label>
      <div className="relative">
        {props.loading ? (
          <div className="w-full bg-white text-md p-3 border-gray-400 border rounded shadow-inner focus:outline-none focus:shadow-outline block fill-current">
            <FontAwesomeIcon icon={faSpinnerThird} spin />
          </div>
        ) : (
          <input
            value={props.value}
            id={props.id}
            placeholder={props.placeholder}
            onChange={props.onChange}
            type={props.type === "password" && !showPassword ? "password" : "text"}
            className="w-full bg-white text-md p-3 border-gray-400 border rounded shadow-inner focus:outline-none focus:shadow-outline block appearance-none leading-normal"
          />
        )}
        {props.type && props.type === "password" ? (
          <button
            type="button"
            className="absolute cursor-pointer top-0 right-0 p-4 focus:outline-none focus:shadow-outline"
            onClick={() => setShowPassword(!showPassword)}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} color="gray" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function Select(props) {
  return (
    <select
      className={props.className || `bg-white border border-gray-400 rounded-sm px-2 py-1`}
      name={props.name}
      id={props.id}
      onChange={props.onChange}
      value={props.value}>
      {props.options.map(o => {
        const option = typeof o === "object" ? o : { value: o };
        return (
          <option value={option.value} key={option.value}>
            {option.label || option.value}
          </option>
        );
      })}
    </select>
  );
}
