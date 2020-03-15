import React from "react";
import { faCoins, faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";
import Logo from "../logo";
import UserMenu from "./user-menu";
import HeaderLink from "./link";
import { useProfile } from "../../hooks/use-profile";
import { useAuth } from "../../hooks/use-auth";

export default function() {
  const { user } = useAuth();
  const { profile, fetching } = useProfile();

  return (
    <div
      className={`fixed w-full z-30 px-2 border-b-2 font-medium bg-gray-800 text-white border-gray-900`}>
      <div className="ff-container ff-h-header flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/app/home" className="hover:no-underline mr-4">
            <Logo dark={true} />
          </Link>
          {isSetupComplete(profile) ? (
            <>
              <HeaderLink path="expenses" icon={faCalendarAlt}>
                Expenses
              </HeaderLink>
              <HeaderLink path="balances" icon={faCoins}>
                Balances
              </HeaderLink>
            </>
          ) : null}
        </div>
        <div className="flex items-center">
          {profile ? (
            <UserMenu
              disabled={fetching || !isSetupComplete(profile)}
              emoji={profile.emoji || "hatching_chick"}
              name={profile.name || user.attributes.email}
            />
          ) : (
            <FontAwesomeIcon icon={faSpinnerThird} spin className="fill-current" />
          )}
        </div>
      </div>
    </div>
  );
}

const isSetupComplete = profile => {
  if (profile) {
    if (!profile.accounts || profile.accounts.length < 1) {
      return false;
    } else if (!profile.expenses || profile.expenses.length < 1) {
      return false;
    }

    return true;
  }

  return false;
};
