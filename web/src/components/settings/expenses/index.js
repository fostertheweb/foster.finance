import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faSave } from "@fortawesome/pro-duotone-svg-icons";
import { useMachine } from "@xstate/react";
import { useFetch } from "../../../hooks/use-fetch";
import { fetchMachine } from "../../../machines/fetch";
import Loading from "../../loading";
import Button from "../../button";
import ExpenseList from "./card";
import { Well } from "../../alert";

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
      <div className="p-2">
        {discoverState.matches("idle") ? (
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
          <div className="p-2 bg-white rounded shadow">
            <ExpenseList
              data={discoverState.context.data}
              error={discoverState.context.error}
              loading={discoverState.matches("loading")}
              onChange={setExpenses}
            />
          </div>
        )}
      </div>
      <div className="sticky ff-top-0 p-2 pl-1">
        <Well
          message="After you finish your account setup and sign in you can add more expenses in the
              settings."
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
