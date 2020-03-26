import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faSave, faPlusCircle } from "@fortawesome/pro-duotone-svg-icons";
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
    actions: {
      fetchData: () => get("/expenses/discover"),
    },
  });
  const [saveExpensesState, sendSaveExpenses] = useMachine(fetchMachine, {
    actions: {
      fetchData: (_context, { expenses }) => post("/expenses", { expenses }),
    },
  });

  useEffect(() => {
    if (!editing) {
      sendFetchDiscover("FETCH");
    }
    // eslint-disable-next-line
  }, [editing]);

  if (discoverState.matches("loading")) return <Loading />;

  function saveSelectedExpenses(expenses) {
    sendSaveExpenses({ type: "FETCH", expenses });

    if (saveExpensesState.matches("resolved")) {
      navigate("/app/home");
    }
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
          <form
            id="expense-selection"
            onSubmit={console.log}
            className="p-2 bg-white rounded shadow mt-2">
            <ExpenseList
              data={discoverState.context.data}
              error={discoverState.context.error}
              loading={discoverState.matches("loading")}
            />
          </form>
        )}
      </div>
      <div className="sticky ff-top-0 p-2 pl-1">
        {editing ? (
          <Button
            secondary
            className="whitespace-no-wrap w-full mb-2"
            text="Add Expense Manually"
            icon={faPlusCircle}
          />
        ) : (
          <Well
            message="After you finish your account setup and sign in you can add more expenses in the
              settings."
          />
        )}
        <Button
          type="submit"
          form="expense-selection"
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
