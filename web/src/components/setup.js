import React from "react";
import { Outlet } from "react-router-dom";

export default function() {
  return (
    <div className="ff-pt-header">
      <Outlet />
    </div>
  );
}
