import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";

const url = process.env.REACT_APP_API_ENDPOINT;
const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const profile = useProfileProvider();

  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => {
  return useContext(ProfileContext);
};

function useProfileProvider() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function getUserProfile() {
    setFetching(true);
    try {
      const response = await fetch(`${url}/users/${user.attributes.sub}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        setProfile(json);
        isSetupComplete(json);
      } else {
        console.error("Profile Not Found");
        setError("Not Found");
        navigate("/app/setup/profile");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      navigate("/app/setup/profile");
    } finally {
      setFetching(false);
    }
  }

  function isSetupComplete({ accounts, expenses }) {
    if (!accounts || accounts.length < 1) {
      navigate("/app/setup/accounts");
    } else if (!expenses || expenses.length < 1) {
      navigate("/app/setup/expenses");
    }

    return true;
  }

  useEffect(() => {
    if (!loading) {
      getUserProfile();
    }
    // eslint-disable-next-line
  }, [loading, user]);

  return {
    profile,
    fetching,
    error,
  };
}
