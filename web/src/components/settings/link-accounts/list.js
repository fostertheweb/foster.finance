import React from "react";
import LinkButton from "./link-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faCheckCircle, faLandmark } from "@fortawesome/pro-duotone-svg-icons";
import { faCircle } from "@fortawesome/pro-light-svg-icons";
import Alert from "../../alert";

export default function({ loading, error, data }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Accounts</h2>
        <LinkButton />
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-2 p-4 bg-white rounded-sm border border-gray-300 w-full">
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
            data.map(account => (
              <div
                key={account.account_id}
                className="flex items-center border border-gray-300 rounded mt-2 p-2 bg-white hover:bg-gray-100 rounded-sm cursor-pointer">
                <FontAwesomeIcon
                  icon={account.selected ? faCheckCircle : faCircle}
                  size="lg"
                  color={!account.selected ? "#90b4ce" : "#3da9fc"}
                  className="mr-4"
                />
                <div>
                  <span className="mr-2">{account.official_name || account.name}</span>
                  <span className="text-gray-500">*{account.mask}</span>
                  <div
                    className={`mt-1 text-gray-500 ${
                      account.subtype.length <= 3 ? "uppercase" : "capitalize"
                    }`}>
                    {account.subtype}
                  </div>
                </div>
                <div className="text-md self-end">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                    account.balances.current,
                  )}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
