import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faExclamationCircle,
  faSparkles,
  faThumbsUp,
  faInfoCircle,
} from "@fortawesome/pro-duotone-svg-icons";

const style = {
  default: {
    icon: faSparkles,
    color: "indigo",
  },
  info: {
    icon: faInfoCircle,
    color: "blue",
  },
  success: {
    icon: faThumbsUp,
    color: "green",
  },
  warn: {
    icon: faExclamationTriangle,
    color: "yellow",
  },
  error: {
    icon: faExclamationCircle,
    color: "red",
  },
};

export default function({ intent, message }) {
  const color = style[intent].color;
  const icon = style[intent].icon;

  if (!message) {
    return null;
  }

  return (
    <div className={`flex items-center flex-grow text-${color}-700`}>
      <FontAwesomeIcon size="2x" icon={icon} />
      <div className={`ml-2 mb-0 text-${color}-800`}>{message}</div>
    </div>
  );
}

export function Well({ intent, message }) {
  const theme = intent ? style[intent] : style["default"];
  const color = theme.color;
  const icon = theme.icon;

  return (
    <div className={`rounded bg-${color}-${color === "gray" ? "200" : "100"} flex items-stretch`}>
      {icon ? (
        <div className={`rounded-l bg-${color}-${color === "gray" ? "400" : "200"} mr-1 p-1`}>
          <FontAwesomeIcon icon={icon} className={`text-${color}-600 fill-current`} />
        </div>
      ) : null}
      <p className={`text-${color}-900 opacity-75 text-xs p-2`}>{message}</p>
    </div>
  );
}
