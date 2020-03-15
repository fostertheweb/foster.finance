import React from "react";
import { useNavigate } from "react-router-dom";

export default function({ to }) {
  const navigate = useNavigate();
  navigate(to);
  return <></>;
}
