import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import AccountList from "./list";
import LinkButton from "./link-button";
import { useNavigate } from "react-router-dom";
import { faSave, faPlusCircle } from "@fortawesome/pro-duotone-svg-icons";
import Button from "../../button";
import { Well } from "../../alert";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function({ editing }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const uid = user.attributes.sub;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const items = JSON.parse(localStorage.getItem(uid)) || [];
    async function getAccounts() {
      try {
        const response = await fetch(`${url}/plaid/accounts`, {
          method: "POST",
          body: JSON.stringify({ items }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const accounts = await response.json();
        const selectAccounts = accounts.map(account => {
          if (account.subtype === "credit card") {
            account.selected = true;
          } else if (account.subtype === "checking") {
            account.selected = true;
          } else {
            account.selected = false;
          }

          return account;
        });
        setData(selectAccounts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getAccounts();
  }, [uid]);

  async function saveSelectedAccounts(ids) {
    try {
      await fetch(`${url}/users/${user.attributes.sub}`, {
        method: "PATCH",
        body: JSON.stringify({ accounts: ids.map(id => ({ id })) }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/app/setup/expenses");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="p-2">
        <div className="bg-white p-4 rounded shadow">
          <h1 className="text-xl font-bold text-gray-700">Link Bank Account</h1>
          <div className="text-gray-700 my-3">
            <p>
              Connect to your bank via your online credentials so we can see transactions from your{" "}
              <b>Checking</b> and <b>Credit Card</b> accounts. You may select any other accounts
              that you pay bills from, so we can find your expenses.
            </p>
          </div>
          {data && data.length > 0 ? (
            <AccountList error={error} data={data} loading={loading} />
          ) : (
            <LinkButton />
          )}
        </div>
      </div>
      <div className="sticky top-0 p-2">
        <Button
          className="w-full whitespace-no-wrap"
          text="Save Account Selection"
          icon={faSave}
          loading={false}
          disabled={loading}
          onClick={() => saveSelectedAccounts(data.filter(a => a.selected).map(a => a.account_id))}
        />
        {editing ? (
          <Button
            className="w-full whitespace-no-wrap mt-2"
            secondary
            text="Link More Accounts"
            icon={faPlusCircle}
            loading={false}
            disabled={loading}
          />
        ) : (
          <div className="mt-2">
            <Well message="If you have more accounts to link you can add them later in your settings after setup." />
          </div>
        )}
      </div>
    </>
  );
}
