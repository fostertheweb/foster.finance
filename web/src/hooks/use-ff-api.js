import React from "react";
import { useAuth } from "./use-auth";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function useAPI() {
  const { user } = useAuth();
  const uid = user.attributes.sub;

  async function linkAccounts(token) {
    try {
      const response = await fetch(`${url}/users/${uid}/accounts/link`, {
        method: "POST",
        body: JSON.stringify({ public_token: token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      console.error(err);
    } finally {
      console.log("done");
    }
  }

  async function getAccountsForUser() {
    try {
      const response = await fetch(`${url}/users/${uid}/accounts`);
      return await response.json();
    } catch (err) {
      console.error(err);
    } finally {
      console.log("done");
    }
  }

  async function saveSelectedAccounts(ids) {
    try {
      await fetch(`${url}/users/${user.attributes.sub}`, {
        method: "PATCH",
        body: JSON.stringify({ accounts: ids.map(id => ({ id })) }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      console.log("done");
    }
  }

  return { linkAccounts, saveSelectedAccounts, getAccountsForUser };
}
