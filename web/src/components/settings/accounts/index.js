import React from "react";
import AccountList from "./list";
import LinkButton from "./link-button";
import { useNavigate } from "react-router-dom";
import { faSave, faPlusCircle } from "@fortawesome/pro-duotone-svg-icons";
import Button from "../../button";
import { Well } from "../../alert";
import { useMachine } from "@xstate/react";
import { useAuth } from "../../../hooks/use-auth";
import { useFetch } from "../../../hooks/use-fetch";
import { fetchMachine } from "../../../machines/fetch";

export default function({ editing }) {
  // const navigate = useNavigate();
  const { userId } = useAuth();
  const { post, patch } = useFetch();
  const [linkState, sendLinkToken] = useMachine(fetchMachine, {
    actions: {
      fetchData: (_context, { public_token }) => post("/accounts/link", { public_token }),
    },
  });
  const [saveAccountsState, sendAccountSelection] = useMachine(fetchMachine, {
    actions: {
      fetchData: (_context, { accounts }) => patch("/accounts", { accounts }),
    },
  });

  function handleSuccess(public_token) {
    sendLinkToken({ type: "FETCH", public_token });
  }

  function saveSelectedAccounts(accounts) {
    localStorage.setItem(userId, linkState.context.data.public_token);
    const selected = accounts.filter(a => a.selected).map(({ account_id }) => account_id);
    sendAccountSelection({
      type: "FETCH",
      accounts: [
        {
          item_id: linkState.context.data.item_id,
          access_token: linkState.context.data.access_token,
          account_ids: selected,
        },
      ],
    });
  }

  return (
    <>
      <div className="p-2">
        <div className="bg-white p-4 rounded shadow">
          {linkState.matches("idle") ? (
            <div className="text-gray-600">
              <p>
                Connect to your bank via your online credentials so we can see transactions from
                your <b>Checking</b> and <b>Credit Card</b> accounts. You may select any other
                accounts that you pay bills from, so we can find your expenses.
              </p>
              <div className="flex justify-between mt-6">
                <LinkButton onLinkSuccess={handleSuccess} loading={linkState.matches("loading")} />
                <span></span>
              </div>
            </div>
          ) : (
            <form id="account-selection" onSubmit={console.log}>
              <AccountList
                data={linkState.context.data}
                error={linkState.context.error}
                loading={linkState.matches("loading")}
              />
            </form>
          )}
        </div>
      </div>
      <div className="sticky ff-top-0 p-2 pl-1">
        {editing ? (
          <Button
            className="w-full whitespace-no-wrap"
            secondary
            text="Link More Accounts"
            icon={faPlusCircle}
            loading={false}
            disabled={false}
          />
        ) : (
          <div className="">
            <Well message="If you have more accounts to link you can add them later in your settings after setup." />
          </div>
        )}
        <Button
          type="submit"
          form="account-selection"
          className="w-full whitespace-no-wrap mt-2"
          text="Save Account Selection"
          icon={faSave}
          loading={saveAccountsState.matches("loading")}
          disabled={saveAccountsState.matches("loading")}
        />
      </div>
    </>
  );
}
