import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelopeOpenText, faUserCheck } from "@fortawesome/pro-duotone-svg-icons";
import { parse } from "query-string";
import { useAuth } from "../../hooks/use-auth";
import Button from "../button";

function Verify({ email }) {
  const { resendSignUp } = useAuth();

  return (
    <>
      <div className="mx-4">
        <FontAwesomeIcon icon={faEnvelopeOpenText} size="6x" color="#5f6c7b" />
      </div>
      <div className="lg:w-1/3 md:w-1/2 w-3/4 mx-4">
        <h2>Email verification required</h2>
        <p className="my-4">
          You should have received an email from us with a link to verify your email address.
        </p>
        <Button
          text="Send the email again"
          icon={faPaperPlane}
          onClick={() => resendSignUp(email)}
        />
      </div>
    </>
  );
}

function Confirmed({ id }) {
  const { confirmSignup } = useAuth();
  const { email, code } = atob(id);

  console.log({ email, code });
  confirmSignup(email, code);

  return (
    <>
      <div className="mx-4">
        <FontAwesomeIcon icon={faUserCheck} size="6x" color="#5f6c7b" />
      </div>
      <div className="lg:w-1/3 md:w-1/2 w-3/4 mx-4">
        <h2>Email Verified</h2>
        <p className="my-4">Wow thank you.</p>
      </div>
    </>
  );
}

export default function(props) {
  const query = parse(props.location.search);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-8">
      {query.id ? <Confirmed id={query.id} /> : <Verify email={query.email} />}
    </div>
  );
}
