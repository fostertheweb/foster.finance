import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import AccountList from "./list";
import LinkButton from "./link-button";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
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
    <div className="mt-4">
      {data ? (
        <AccountList
          error={error}
          data={data}
          loading={loading}
          onSaveSelection={saveSelectedAccounts}
        />
      ) : (
        <div className="flex items-center justify-between">
          <LinkButton />
        </div>
      )}
    </div>
  );
}
