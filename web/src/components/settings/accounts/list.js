import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faLandmark } from "@fortawesome/pro-duotone-svg-icons";
import Alert from "../../alert";

export default function({ loading, error, data }) {
  return (
    <div className="">
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
          <div className="text-gray-600 text-lg font-medium p-2">
            <FontAwesomeIcon icon={faLandmark} size="lg" className="mr-2" />
            Plaid Bank of Canada
          </div>
          {error ? (
            <Alert error={error.message || error} />
          ) : (
            <>
              <div className="my-2">
                {data.map(account => (
                  <div
                    key={account.account_id}
                    className="flex items-center p-1 hover:bg-gray-200 border-t border-gray-300 cursor-pointer">
                    <div className="text-center p-2 mr-2">
                      <input type="checkbox" checked={account.selected} />
                    </div>
                    <div className="flex-grow">
                      <span className="mr-2">{account.official_name || account.name}</span>
                      <div
                        className={`text-gray-500 ${
                          account.subtype.length <= 3 ? "uppercase" : "capitalize"
                        }`}>
                        {account.subtype}
                      </div>
                    </div>
                    <div className="text-md text-right">
                      <div>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(account.balances.current)}
                      </div>
                      <div className="ff-font-mono text-gray-500" style={{ fontfamily: "Courier" }}>
                        <span className="text-gray-300">XXXX</span>
                        {account.mask}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
