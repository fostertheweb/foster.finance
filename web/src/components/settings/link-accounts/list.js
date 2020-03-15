import React from "react";
import LinkButton from "./link-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faLandmark, faCheck, faSave } from "@fortawesome/pro-duotone-svg-icons";
import Alert from "../../alert";
import Button from "../../button";

export default function({ loading, error, data }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Bank Accounts</h2>
        <LinkButton />
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-2 p-4 bg-white rounded border border-gray-300 w-full">
          <FontAwesomeIcon
            icon={faSpinnerThird}
            spin
            className="text-gray-400 fill-current"
            size="lg"
          />
        </div>
      ) : (
        <>
          <div className="mt-4 text-gray-600 text-lg font-medium p-2">
            <FontAwesomeIcon icon={faLandmark} size="lg" className="mr-2" />
            Plaid Bank of Canada
          </div>
          {error ? (
            <Alert error={error.message || error} />
          ) : (
            <>
              <div className="my-2 border border-gray-300 rounded">
                {data.map(account => (
                  <div
                    key={account.account_id}
                    className="flex items-center border-t first:border-t-0 border-gray-300 p-2 bg-white hover:bg-gray-100 rounded-sm cursor-pointer">
                    <div className="w-10 text-center mr-2">
                      {account.selected ? (
                        <FontAwesomeIcon icon={faCheck} size="lg" color={"#3da9fc"} />
                      ) : null}
                    </div>
                    <div className="flex-grow">
                      <span className="mr-2">{account.official_name || account.name}</span>
                      <span className="text-gray-500">*{account.mask}</span>
                      <div
                        className={`mt-1 text-gray-500 ${
                          account.subtype.length <= 3 ? "uppercase" : "capitalize"
                        }`}>
                        {account.subtype}
                      </div>
                    </div>
                    <div className="text-md">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(account.balances.current)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-4 flex justify-end">
                <Button
                  text="Save Account Selection"
                  icon={faSave}
                  loading={false}
                  disabled={loading}
                  onClick={() => console.log(data.filter(a => a.selected).map(a => a.account_id))}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
