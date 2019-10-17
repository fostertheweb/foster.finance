import React from "react";
import { AddAccountButton, AccountsList } from "./Plaid";

export function Accounts() {
  return (
    <div>
      <AddAccountButton />
      <AccountsList />
    </div>
  );
}
