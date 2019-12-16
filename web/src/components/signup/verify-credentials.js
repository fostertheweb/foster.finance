import React from "react";
import { Icon } from "@blueprintjs/core";

export default function() {
  return (
    <div>
      <Icon icon="envelope" size={64} />
      <h2>Email verification required</h2>
      <p>Click the link sent to your email address.</p>
    </div>
  );
}
