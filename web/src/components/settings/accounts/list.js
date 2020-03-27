import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faLandmark } from "@fortawesome/pro-duotone-svg-icons";
import Alert from "../../alert";
import ListItem from "./list-item";

export default function({ loading, error, data, onChange }) {
  const [accounts, setAccounts] = useState(data.accounts);

  function handleSelect(account_id) {
    const index = accounts.findIndex(a => a.account_id === account_id);
    const selectedAccount = accounts.splice(index, 1);
    setAccounts([
      ...accounts,
      { ...selectedAccount, selected: !Boolean(selectedAccount.selected) },
    ]);
  }

  useEffect(() => {
    onChange(accounts);
    //eslint-disable-next-line
  }, [accounts]);

  return (
    <div className="flex-grow">
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
            {data.institution.logo ? (
              <img
                src={`data:image/png;base64,${data.institution.logo}`}
                alt="bank logo"
                className="w-8 h-8 mr-2 inline-block"
              />
            ) : (
              <FontAwesomeIcon
                icon={faLandmark}
                size="lg"
                className="mr-3"
                color={data.institution.primary_color}
              />
            )}
            {data.institution.name}
          </div>
          {error ? (
            <Alert error={error.message || error} />
          ) : (
            <>
              <div className="my-2">
                {data.accounts.map(account => (
                  <ListItem account={account} key={account.account_id} onSelect={handleSelect} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
