import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import { useMachine } from "@xstate/react";
import { useFetch } from "../../../hooks/use-fetch";
import { fetchMachine } from "../../../machines/fetch";
import Loading from "../../common/loading";
import Button from "../../common/button";
import ExpenseList from "./card";
import { Well } from "../../common/alert";

export default function({ editing }) {
  const navigate = useNavigate();
  const { get, post } = useFetch();
  const [discoverState, sendFetchDiscover] = useMachine(fetchMachine, {
    services: {
      fetchData: () => get("/expenses/discover"),
    },
  });
  const [saveExpensesState, sendSaveExpenses] = useMachine(fetchMachine, {
    services: {
      fetchData: (_context, { expenses }) => post("/expenses", { expenses }),
    },
  });
  const [expenses, setExpenses] = useState([]);
  const fetched = discoverState.matches("resolved");
  const saved = saveExpensesState.matches("resolved");

  useEffect(() => {
    if (!editing) {
      sendFetchDiscover("FETCH");
    }
    // eslint-disable-next-line
  }, [editing]);

  useEffect(() => {
    if (saved) {
      navigate("/app");
    }
    // eslint-disable-next-line
  }, [saved]);

  useEffect(() => {
    if (fetched) {
      setExpenses(discoverState.context.data);
    }
    // eslint-disable-next-line
  }, [fetched]);

  if (discoverState.matches("loading")) return <Loading />;

  function handleSubmit() {
    sendSaveExpenses({
      type: "FETCH",
      expenses: expenses.filter(e => e.selected),
    });
  }

  return (
    <>
      <div className="p-2 w-2/3">
        {discoverState.matches("resolved") ? (
          <div className="p-4 bg-white rounded shadow">
            <div className="text-gray-600">
              <h1 className="text-xl text-gray-700 font-bold tracking-wide">
                Setup Bills &amp; Income
              </h1>
              <p className="mt-4 leading-normal">
                You are doing a great job! We just need one last thing from you.
              </p>

              <p className="mt-4 leading-normal">
                We looked at your transactions over the last 3 months from the accounts you selected
                previously and found what we think are your monthly expenses.
              </p>

              <p className="mt-4 leading-normal">
                Confirm your bills and income by selecting them below and hit save to finish setup!
              </p>
            </div>
            <ExpenseList
              data={discoverState.context.data}
              error={discoverState.context.error}
              loading={discoverState.matches("loading")}
              onChange={setExpenses}
            />
          </div>
        ) : null}
      </div>
      <div className="w-1/3 sticky ff-top-0 p-2 pl-1">
        <Well
          message={
            <div>
              After setup you can add more bills or income in <b>Settings</b> by selecting from
              recent transactions or adding them manually.
            </div>
          }
        />
        <Button
          onClick={handleSubmit}
          className="whitespace-no-wrap w-full mt-2"
          text="Save Recurring Expenses"
          icon={faSave}
          loading={discoverState.matches("loading")}
          disabled={discoverState.matches("loading")}
        />
      </div>
    </>
  );
}
