import React from "react";

export default function({ char, label }) {
  return (
    <span role="img" aria-label={label}>
      {char}
    </span>
  );
}
