import React from "react";
import { Outlet } from "react-router-dom";

export default function() {
  return (
    <div className="ff-pt-header flex items-start justify-center w-4/5 mx-auto">
      <Outlet />
    </div>
  );
}
