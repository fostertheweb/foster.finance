import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import { useAuth } from "../../../hooks/use-auth";
import { useFetch } from "../../../hooks/use-fetch";
import { fetchMachine } from "../../../machines/fetch";
import AccountList from "./list";
import LinkButton from "../../link-button";
import Button from "../../common/button";
import { Well } from "../../common/alert";

export default function() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { post } = useFetch();
  const [fetchLinkState, sendFetchLink] = useMachine(fetchMachine, {
    services: {
      fetchData: (_context, { public_token }) => post("/accounts/link", { public_token }),
    },
  });
  const [postAccountsState, sendPostAccounts] = useMachine(fetchMachine, {
    services: {
      fetchData: (_context, { accounts }) => post("/accounts", { accounts }),
    },
  });
  const [accounts, setAccounts] = useState([]);
  const fetched = fetchLinkState.matches("resolved");
  const saved = postAccountsState.matches("resolved");

  function handleLinkSuccess(public_token) {
    sendFetchLink({ type: "FETCH", public_token });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { item_id, access_token, public_token } = fetchLinkState.context.data;
    const selected = accounts.filter(a => a.selected).map(({ account_id }) => account_id);
    localStorage.setItem(userId, public_token);
    sendPostAccounts({
      type: "FETCH",
      accounts: [
        {
          item_id,
          access_token,
          account_ids: selected,
        },
      ],
    });
  }

  useEffect(() => {
    if (fetched) {
      setAccounts(fetchLinkState.context.data.accounts);
    }
    //eslint-disable-next-line
  }, [fetched]);

  useEffect(() => {
    if (saved) {
      navigate("/app/setup/expenses");
    }
    //eslint-disable-next-line
  }, [saved]);

  return (
    <>
      <div className="p-2">
        <div className="bg-white p-4 rounded shadow">
          {fetchLinkState.matches("resolved") ? (
            <AccountList
              data={fetchLinkState.context.data}
              error={fetchLinkState.context.error}
              onChange={setAccounts}
            />
          ) : (
            <div className="text-gray-600">
              <p>
                Connect to your bank via your online credentials so we can see transactions from
                your <b>Checking</b> and <b>Credit Card</b> accounts. You may select any other
                accounts that you pay bills from, so we can find your expenses.
              </p>
              <div className="flex items-baseline justify-between mt-6">
                <LinkButton
                  onLinkSuccess={handleLinkSuccess}
                  loading={fetchLinkState.matches("loading")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="sticky ff-top-0 p-2 pl-1">
        <Well message="If you have more accounts to link you can add them later in your settings after setup." />
        <Button
          onClick={handleSubmit}
          className="w-full whitespace-no-wrap mt-2"
          text="Save Account Selection"
          icon={faSave}
          loading={postAccountsState.matches("loading")}
          disabled={!fetchLinkState.matches("resolved")}
        />
      </div>
    </>
  );
}
