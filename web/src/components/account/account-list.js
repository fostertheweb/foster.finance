import React from "react";
import ConnectBank from "./connect-bank";

export default function() {
  return (
    <div className="p-4">
      <ConnectBank />
      <div className="accounts-list"></div>
    </div>
  );
}
