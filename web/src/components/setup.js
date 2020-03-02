import React from "react";
import { Outlet } from "react-router-dom";

export default function() {
  return (
    <div className="p-4 flex justify-center">
      <Outlet />
    </div>
  );
}
