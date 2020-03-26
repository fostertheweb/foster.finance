import React, { useState } from "react";
import AccountList from "./list";
import LinkButton from "./link-button";
import { useNavigate } from "react-router-dom";
import { faSave, faPlusCircle } from "@fortawesome/pro-duotone-svg-icons";
import Button from "../../button";
import { Well } from "../../alert";
import useAPI from "../../../hooks/use-api";
import { useAuth } from "../../../hooks/use-auth";

export default function({ editing }) {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { state, post, patch } = useAPI();
  const [data, setData] = useState(state.context.data);

  function handleSuccess(public_token) {
    post("/accounts/link", { public_token });
  }

  function saveSelectedAccounts(accounts) {
    localStorage.setItem(userId, state.context.data.public_token);
    const selected = accounts.filter(a => a.selected).map(({ account_id }) => account_id);

    patch("/accounts", {
      accounts: [
        {
          item_id: state.context.data.item_id,
          access_token: state.context.data.access_token,
          account_ids: selected,
        },
      ],
    });

    if (state.matches("resolved")) {
      navigate("/app/setup/expenses");
    }
  }

  return (
    <>
      <div className="p-2">
        <form id="account-selection" onSubmit={console.log} className="bg-white p-4 rounded shadow">
          {state.matches("idle") ? (
            <div className="text-gray-600">
              <p>
                Connect to your bank via your online credentials so we can see transactions from
                your <b>Checking</b> and <b>Credit Card</b> accounts. You may select any other
                accounts that you pay bills from, so we can find your expenses.
              </p>
              <div className="flex justify-between mt-6">
                <LinkButton onLinkSuccess={handleSuccess} />
                <span></span>
              </div>
            </div>
          ) : (
            <AccountList
              data={state.context.data}
              error={state.context.error}
              loading={state.matches("loading")}
            />
          )}
        </form>
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
          loading={false}
          disabled={true}
        />
      </div>
    </>
  );
}
