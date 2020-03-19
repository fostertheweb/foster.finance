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
import { useLocation } from "react-router-dom";

export default function() {
  const { user } = useAuth();
  const { profile, fetching } = useProfile();
  const location = useLocation();
  const isDuringSetup = location.pathname.includes("setup");

  return (
    <div
      className={`fixed w-full z-30 px-2 border-b-2 font-medium bg-gray-800 text-white border-gray-900`}>
      <div className="ff-container ff-h-header flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/app" className="hover:no-underline mr-4">
            <Logo dark={true} />
          </Link>
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
          {profile ? (
            <UserMenu
              disabled={fetching || isDuringSetup}
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
