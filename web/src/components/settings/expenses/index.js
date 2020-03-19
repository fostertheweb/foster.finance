import React, { useState, useEffect } from "react";
import * as luxon from "luxon";
import { useNavigate } from "react-router-dom";
import { faSave, faPlusCircle } from "@fortawesome/pro-duotone-svg-icons";
import { useAuth } from "../../../hooks/use-auth";
import Loading from "../../loading";
import Button from "../../button";
import List from "./card";
import { Well } from "../../alert";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function({ editing }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const uid = user.attributes.sub;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const today = luxon.DateTime.local();
  const end_date = today.toFormat("yyyy-MM-dd");
  const start_date = today.minus({ months: 3 }).toFormat("yyyy-MM-dd");

  useEffect(() => {
    async function getTransactions() {
      const items = JSON.parse(localStorage.getItem(uid)) || [];
      const response = await fetch(`${url}/plaid/expenses`, {
        method: "POST",
        body: JSON.stringify({ items, start_date, end_date }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const transactions = await response.json();
      setData(transactions);
      setLoading(false);
    }

    getTransactions();
    // eslint-disable-next-line
  }, [uid]);

  if (loading) {
    return <Loading />;
  }

  async function saveSelectedExpenses(expenses) {
    try {
      setSaving(true);
      await fetch(`${url}/users/${user.attributes.sub}`, {
        method: "PATCH",
        body: JSON.stringify({ expenses }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/app/home");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="ff-h-full p-4 relative">
        <div className="p-4 bg-white rounded shadow">
          <h1 className="text-xl font-bold text-gray-800">Recurring Expenses</h1>
          <div className="text-gray-700 my-3">
            <p>
              We looked at the last <b>3</b> months of transactions from your <b>Checking</b> and{" "}
              <b>Credit</b> accounts and found the following recurring expenses. Confirm your
              monthly expenses below and save the selection.
            </p>
          </div>
        </div>
        <div className="p-4 bg-white rounded shadow mt-4">
          <List data={data} />
        </div>
      </div>
      <div className="sticky top-0 py-4 pr-4">
        <Button
          className="whitespace-no-wrap w-full"
          text="Save Recurring Expenses"
          icon={faSave}
          loading={saving}
          disabled={saving || loading}
          onClick={() => saveSelectedExpenses(data.filter(e => e.selected))}
        />
        {editing ? (
          <Button
            secondary
            className="whitespace-no-wrap w-full mt-2"
            text="Add Expense Manually"
            icon={faPlusCircle}
            loading={saving}
            disabled={saving || loading}
          />
        ) : (
          <div className="mt-2">
            <Well
              message="After you finish your account setup and sign in you can add more expenses in the
              settings."
            />
          </div>
        )}
      </div>
    </>
  );
}
