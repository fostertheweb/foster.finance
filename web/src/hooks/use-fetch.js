// import React from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";

export const fetchMachine = Machine(
  {
    id: "fetch",
    initial: "idle",
    context: {
      data: null,
      error: null,
    },
    states: {
      idle: {
        on: { FETCH: "loading" },
      },
      loading: {
        on: {
          RESOLVE: { target: "resolved", actions: ["setData"] },
          REJECT: { target: "rejected", actions: ["setError"] },
        },
      },
      resolved: {
        entry: "setData",
        type: "final",
      },
      rejected: {
        entry: "setError",
        type: "final",
      },
    },
  },
  {
    actions: {
      setData: assign((_, event) => {
        console.log({ event });
        return {
          data: event.data,
        };
      }),
      setError: assign((_, event) => {
        console.log({ event });
        return { error: event.error };
      }),
    },
  },
);

export function useFetch(baseURL, options) {
  const defaultOptions = {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  };
  const [state, send] = useMachine(fetchMachine);

  async function get(url, query) {
    send("FETCH");
    try {
      if (query) {
        const API_URL = new URL(baseURL);
        Object.entries(query).map(([key, value]) => API_URL.searchParams.append(key, value));
      }
      const response = await fetch(`${baseURL}${url}`, {
        ...defaultOptions,
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ method: "GET", data });
        send({ type: "RESOLVE", data });
      } else {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error) {
      send({ type: "REJECT", error });
    }
  }

  async function post(url, body) {
    send("FETCH");
    try {
      const response = await fetch(`${baseURL}${url}`, {
        ...defaultOptions,
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ method: "POST", data });
        send({ type: "RESOLVE", data });
      } else {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error) {
      send({ type: "REJECT", error });
    }
  }

  async function patch(url, body) {
    send("FETCH");
    try {
      const response = await fetch(`${baseURL}${url}`, {
        ...defaultOptions,
        method: "PATCH",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ method: "PATCH", data });
        send({ type: "RESOLVE", data });
      } else {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error) {
      send({ type: "REJECT", error });
    }
  }

  async function destroy(url, query) {
    send("FETCH");
    try {
      if (query) {
        const API_URL = new URL(baseURL);
        Object.entries(query).map(([key, value]) => API_URL.searchParams.append(key, value));
      }
      const response = await fetch(`${baseURL}${url}`, {
        ...defaultOptions,
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ method: "DELETE", data });
        send({ type: "RESOLVE", data });
      } else {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error) {
      send({ type: "REJECT", error });
    }
  }

  return { state, get, post, patch, destroy };
}
