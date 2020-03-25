// import React from "react";
import { useAuth } from "./use-auth";
import { useFetch } from "./use-fetch";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

export default function useAPI() {
  const { jwt } = useAuth();

  return useFetch(baseURL, {
    headers: {
      Authorization: jwt,
    },
  });
}
