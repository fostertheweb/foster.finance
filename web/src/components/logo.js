import React from "react";
import Emoji from "./emoji";

export default function() {
  return (
    <div className="logo">
      <Emoji char={"�"} label="money with wings" className="icon" />
      <div className="text">
        <div className="top">Foster</div>
        <div className="bottom">Finance</div>
      </div>
    </div>
  );
}
