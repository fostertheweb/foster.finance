import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelopeOpenText, faUserCheck } from "@fortawesome/pro-duotone-svg-icons";
import { parse } from "query-string";
import { useAuth } from "../../hooks/use-auth";
import Button from "../button";
import { useLocation, useNavigate } from "react-router-dom";

function CheckEmail({ email }) {
  const { resendSignUp, loading } = useAuth();

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
          loading={loading}
          text="Send the email again"
          icon={faPaperPlane}
          onClick={() => resendSignUp(email)}
        />
      </div>
    </>
  );
}

function Confirmed({ id, code }) {
  const { loading, error, confirmSignUp } = useAuth();
  const email = atob(id);
  const navigate = useNavigate();

  useEffect(() => {
    confirmSignUp(email, code);
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
    // eslint-disable-next-line
  }, []);

  if (loading) return <b>loading confirm...</b>;
  if (error && error.code === "NotAuthorizedException") {
    navigate("/signin");
  }
  if (error) return <b>user confirmation error</b>;

  return (
    <>
      <div className="mx-4">
        <FontAwesomeIcon icon={faUserCheck} size="5x" color="#5f6c7b" />
      </div>
      <div className="lg:w-1/3 md:w-1/2 w-3/4 mx-4">
        <h2>Email Verified</h2>
        <p className="my-4">Wow thank you.</p>
      </div>
    </>
  );
}

export default function() {
  const location = useLocation();
  const { id, code, email } = parse(location.search);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-8">
      {id ? <Confirmed id={id} code={code} /> : <CheckEmail email={email} />}
    </div>
  );
}
