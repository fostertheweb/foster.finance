import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCalendarAlt } from "@fortawesome/pro-duotone-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo";
import { useAuth } from "../../hooks/use-auth";
import UserMenu from "./user-menu";

const url = process.env.REACT_APP_API_ENDPOINT;

function HeaderLink({ path, icon, children }) {
  return (
    <NavLink
      to={`/app/${path}`}
      activeClassName="bg-gray-900"
      className={`ml-4 hover:no-underline p-2 rounded transition duration-150 ease-in-out text-gray-300 hover:text-white hover:bg-gray-700 focus:bg-gray-700`}>
      <FontAwesomeIcon icon={icon} />
      <span className="ml-2">{children}</span>
    </NavLink>
  );
}

export default function() {
  const { user, loading } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserInfo() {
      setFetching(true);
      try {
        const response = await fetch(`${url}/users/${user.attributes.sub}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const info = await response.json();
          setData(info);
        } else {
          setError("Not Found");
          navigate("/app/setup/profile");
        }
      } catch (err) {
        setError(err.message);
        navigate("/app/setup/profile");
      } finally {
        setFetching(false);
      }
    }

    if (!loading && user) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div
      className={`fixed w-full z-30 px-2 border-b-2 font-medium bg-gray-800 text-white border-gray-900`}>
      <div className="ff-container ff-h-header flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/app/home" className="hover:no-underline mr-4">
            <Logo dark={true} />
          </Link>
          {error || loading || fetching ? null : (
            <>
              <HeaderLink path="expenses" icon={faCalendarAlt}>
                Expenses
              </HeaderLink>
              <HeaderLink path="balances" icon={faCoins}>
                Balances
              </HeaderLink>
            </>
          )}
        </div>
        <div className="flex items-center">
          <UserMenu
            loading={loading || fetching}
            emoji={(data && data.emoji) || "hatching_chick"}
            name={(data && data.name) || user.attributes.email}
          />
        </div>
      </div>
    </div>
  );
}
