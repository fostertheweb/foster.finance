import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird, faCoins, faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";
import { useFetch } from "../../hooks/use-fetch";
import { useAuth } from "../../hooks/use-auth";
import { fetchMachine } from "../../machines/fetch";
import Logo from "../common/logo";
import UserMenu from "./user-menu";
import HeaderLink from "./link";

export default function () {
  const { user } = useAuth();
  const fetch = useFetch();
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const isDuringSetup = location.pathname.includes("setup");
  const [state, send] = useMachine(fetchMachine, {
    services: {
      fetchData: () => fetch("/profile"),
    },
  });

  function isSetupComplete({ accounts, expenses }) {
    if (!accounts || accounts.length < 1) {
      navigate("/app/setup/accounts");
    } else if (!expenses || expenses.length < 1) {
      navigate("/app/setup/expenses");
    }

    return true;
  }

  useEffect(() => {
    send("FETCH");
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state.matches("resolved")) {
      setProfile(state.context.data);
      isSetupComplete(state.context.data);
    }
    //eslint-disable-next-line
  }, [state]);

  return (
    <div
      className={`fixed w-full z-30 px-2 border-b-2 font-medium bg-gray-800 text-white border-gray-900`}>
      <div className="ff-container ff-h-header flex items-center justify-between">
        <div className="flex items-center">
          {isDuringSetup ? (
            <div className="hover:no-underline mr-4">
              <Logo dark={true} />
            </div>
          ) : (
            <Link to="/app" className="hover:no-underline mr-4">
              <Logo dark={true} />
            </Link>
          )}
          {!isDuringSetup ? (
            <>
              <HeaderLink path="transactions" icon={faCalendarAlt}>
                Transactions
              </HeaderLink>
              <HeaderLink path="balances" icon={faCoins}>
                Balances
              </HeaderLink>
            </>
          ) : null}
        </div>
        <div className="flex items-center">
          {state.matches("loading") ? (
            <FontAwesomeIcon icon={faSpinnerThird} spin className="fill-current" />
          ) : (
            <UserMenu
              disabled={isDuringSetup}
              emoji={profile.emoji || "hatching_chick"}
              name={profile.name || user.attributes.email}
            />
          )}
        </div>
      </div>
    </div>
  );
}
