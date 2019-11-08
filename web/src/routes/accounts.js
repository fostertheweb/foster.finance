import React from "react";
import ConnectBankButton from "../components/account/connect-bank";
import AccountList from "../components/account/account-list";
import Header from "../components/header";

export default function() {
  return (
    <>
      <Header />
      <div className="accounts">
        <ConnectBankButton />
        <AccountList />
      </div>
    </>
  );
}
