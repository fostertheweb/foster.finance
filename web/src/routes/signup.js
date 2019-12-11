import React from "react";
import Logo from "../components/logo";

export default function({ children }) {
  return (
    <>
      <div className="header">
        <Logo />
      </div>
      <div className="s-wrap">{children}</div>
    </>
  );
}
