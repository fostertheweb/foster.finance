import React, { useEffect, useState } from "react";
import AccountList from "./list";
import LinkButton from "./link-button";
import { useNavigate } from "react-router-dom";
import { faSave, faPlusCircle } from "@fortawesome/pro-duotone-svg-icons";
import Button from "../../button";
import { Well } from "../../alert";
import useAPI from "../../../hooks/use-ff-api";

export default function({ editing }) {
  const navigate = useNavigate();
  const { linkAccounts, saveSelectedAccounts } = useAPI();
  const [data, setData] = useState();

  async function handleSuccess(token) {
    const d = await linkAccounts(token);
    setData(d);
  }

  return (
    <>
      <div className="p-2">
        <div className="bg-white p-4 rounded shadow">
          {data && data.accounts && data.accounts.length > 0 ? (
            <AccountList data={data} />
          ) : (
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
          className="w-full whitespace-no-wrap mt-2"
          text="Save Account Selection"
          icon={faSave}
          loading={false}
          disabled={true}
          onClick={() => saveSelectedAccounts(data.filter(a => a.selected))}
        />
      </div>
    </>
  );
}
