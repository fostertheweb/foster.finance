import React from "react";
import { Outlet } from "react-router-dom";
import Progress from "./progress";

export default function() {
  return (
    <div className="ff-pt-header w-4/5 mx-auto">
      <Progress />
      <div className="flex items-start justify-center">
        <Outlet />
      </div>
    </div>
  );
}
