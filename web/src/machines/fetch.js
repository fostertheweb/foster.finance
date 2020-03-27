import { Machine, assign } from "xstate";

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
        invoke: {
          src: "fetchData",
          onDone: { target: "resolved", actions: ["setData"] },
          onError: { target: "rejected", actions: ["setError"] },
        },
      },
      resolved: {
        on: { FETCH: "loading" },
      },
      rejected: {
        on: { FETCH: "loading" },
      },
    },
  },
  {
    actions: {
      setData: assign((_context, event) => ({ data: event.data })),
      setError: assign((_context, event) => ({ error: event.error })),
    },
  },
);
