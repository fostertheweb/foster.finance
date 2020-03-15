import React from "react";
import { Outlet } from "react-router-dom";

export default function() {
  return (
    <div className="ff-pt-header w-full md:w-1/2 lg:w-1/3 px-8 mx-auto">
      <Outlet />
    </div>
  );
}
