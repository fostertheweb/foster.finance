import { Machine, assign } from "xstate";

export const authMachine = Machine(
  {
    id: "auth",
    initial: "no_auth",
    context: {
      id: null,
      email: null,
      token: null,
    },
    states: {
      no_auth: {
        on: {
          SIGN_IN: "authenticating",
        },
      },
      authenticating: {
        invoke: {
          src: "signIn",
          onDone: { target: "authenticated", actions: ["setData"] },
          onError: { target: "no_auth", actions: ["setError"] },
        },
      },
      authenticated: {
        on: {
          SIGN_OUT: {
            target: "no_auth",
          },
        },
      },
    },
  },
  {
    actions: {
      clearSession: assign(() => {
        return { id: null, email: null, token: null };
      }),
      setData: assign((_context, event) => {
        const id = event.user.attributes.sub;
        const email = event.user.attributes.email;
        const token = event.user.signInUserSession.idToken.jwtToken;
        return { id, email, token };
      }),
      setError: assign((_context, event) => {
        return { error: event.error };
      }),
    },
  },
);
