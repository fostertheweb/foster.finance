import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/pro-duotone-svg-icons";
import useFetch from "use-http";
import { useAuth } from "../../hooks/use-auth";
import LinkButton from "./link-button";

const url = process.env.REACT_APP_API_ENDPOINT;

export default function() {
  const { user } = useAuth();
  const { post, data } = useFetch(url);

  async function handleSuccess(token) {
    const uid = user.attributes.sub;
    const item = await post("/plaid/exchange", { public_token: token });
    const items = JSON.parse(localStorage.getItem(uid)) || [];
    localStorage.setItem(uid, JSON.stringify([...items, item]));
  }

  if (data) {
    console.log(data);
  }

  return (
    <div>
      <FontAwesomeIcon icon={faQuestion} size="lg" />
      <h2>No accounts connected</h2>
      <LinkButton onSuccess={handleSuccess} />
    </div>
  );
}
