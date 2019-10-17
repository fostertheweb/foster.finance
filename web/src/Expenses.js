import React from "react";
import { Calendar } from "./Calendar";

export function Expenses() {
  return (
    <div>
      <Calendar year={2019} month={10} />
    </div>
  );
}
