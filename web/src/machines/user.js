import { Machine, assign } from "xstate";

export const userMachine = Machine(
  {
    id: "user",
    initial: "need_profile",
    context: {
      profile: null,
      error: null,
    },
    states: {
      need_profile: {
        on: { CREATE: "creating" },
      },
      creating: {
        invoke: {
          src: "createProfile",
          onDone: { target: "need_accounts", actions: ["setData"] },
          onError: { target: "error", actions: ["setError"] },
        },
      },
      need_accounts: {
        on: { FETCH: "loading" },
      },
      error: {
        on: { FETCH: "loading" },
      },
    },
  },
  {
    actions: {
      setData: assign((_context, event) => ({ profile: event.profile })),
      setError: assign((_context, event) => ({ error: event.error })),
    },
  },
);
