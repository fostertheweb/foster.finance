import React from "react";
import { MinimalHeader } from "../components/header";

export default function({ children }) {
  return (
    <>
      <MinimalHeader />
      {children}
    </>
  );
}
