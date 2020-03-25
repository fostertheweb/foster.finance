import React, { useState, useEffect } from "react";
import * as luxon from "luxon";
import { useNavigate } from "react-router-dom";
import { faSave, faPlusCircle } from "@fortawesome/pro-duotone-svg-icons";
import useAPI from "../../../hooks/use-api";
import Loading from "../../loading";
import Button from "../../button";
import ExpenseList from "./card";
import { Well } from "../../alert";

export default function({ editing }) {
  const navigate = useNavigate();
  const { state, get, patch } = useAPI();
  const [data, setData] = useState(state.context.data);

  const today = luxon.DateTime.local();
  const end_date = today.toFormat("yyyy-MM-dd");
  const start_date = today.minus({ months: 3 }).toFormat("yyyy-MM-dd");

  useEffect(() => {
    if (!editing) {
      get("/expenses/discover", { start_date, end_date });
    }
    // eslint-disable-next-line
  }, [editing]);

  if (state.matches("loading")) return <Loading />;

  function saveSelectedExpenses(expenses) {
    patch("/expenses", { expenses });

    if (state.matches("resolved")) {
      navigate("/app/home");
    }
  }

  return (
    <>
      <div className="p-2">
        {state.matches("idle") ? (
          <div className="p-4 bg-white rounded shadow">
            <div className="text-gray-600">
              <p>
                We looked at the last <b>3</b> months of transactions from your <b>Checking</b> and{" "}
                <b>Credit</b> accounts and found the following recurring expenses. Confirm your
                monthly expenses below and save the selection.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-2 bg-white rounded shadow mt-2">
            <ExpenseList
              data={state.context.data}
              error={state.context.error}
              loading={state.matches("loading")}
              onSelectExpense={expenses => setData(expenses)}
            />
          </div>
        )}
      </div>
      <div className="sticky ff-top-0 p-2 pl-1">
        {editing ? (
          <Button
            secondary
            className="whitespace-no-wrap w-full mb-2"
            text="Add Expense Manually"
            icon={faPlusCircle}
            loading={state.matches("loading")}
            disabled={state.matches("loading")}
          />
        ) : (
          <Well
            message="After you finish your account setup and sign in you can add more expenses in the
              settings."
          />
        )}
        <Button
          className="whitespace-no-wrap w-full mt-2"
          text="Save Recurring Expenses"
          icon={faSave}
          loading={state.matches("loading")}
          disabled={state.matches("loading")}
          onClick={() => saveSelectedExpenses(data.filter(e => e.selected))}
        />
      </div>
    </>
  );
}
