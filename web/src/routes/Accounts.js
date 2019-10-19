import React from "react";
import ConnectBankButton from "../accounts/ConnectBankButton";
import AccountsList from "../accounts/AccountsList";

export default function() {
  return (
    <div className="accounts">
      <ConnectBankButton />
      <AccountsList />
    </div>
  );
}
