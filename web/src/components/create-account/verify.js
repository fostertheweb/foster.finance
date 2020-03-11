import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faEnvelopeOpenText,
  faUserCheck,
  faSpinnerThird,
} from "@fortawesome/pro-duotone-svg-icons";
import { parse } from "query-string";
import { useAuth } from "../../hooks/use-auth";
import Button from "../button";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading";
import Error from "../error";
import PanelTitle from "../panel-title";

function CheckEmail({ email }) {
  const { resendSignUp, loading } = useAuth();

  return (
    <>
      <PanelTitle title="Verify" />
      <div className="w-full text-center mt-6">
        <FontAwesomeIcon icon={faEnvelopeOpenText} size="5x" color="#5f6c7b" />
      </div>
      <h2 className="mt-6">Email verification required</h2>
      <p className="mt-2">
        You should have received an email from us with a link to verify your email address.
      </p>
      <Button
        large
        className="w-full mt-6"
        loading={loading}
        text="Send email again"
        icon={faPaperPlane}
        onClick={() => resendSignUp(email)}
      />
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
      navigate("/");
    }, 1200);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;
  if (error && error.code === "NotAuthorizedException") {
    navigate("/");
  }
  if (error) return <Error message={error.message} />;

  return (
    <>
      <PanelTitle title="Confirm" />
      <div className="w-full text-center mt-6">
        <div className="fa-layers fa-fw h-4 block py-12 w-full text-center">
          <FontAwesomeIcon icon={faUserCheck} size="2x" className="text-green-500 fill-current" />
          <FontAwesomeIcon
            icon={faSpinnerThird}
            spin
            size="7x"
            className="text-gray-300 fill-current"
          />
        </div>
      </div>
      <h2 className="mt-6">Email address confirmed</h2>
      <p className="mt-2">You are now being redirected to sign in...</p>
    </>
  );
}

export default function() {
  const location = useLocation();
  const { id, code, email } = parse(location.search);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-stretch w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded shadow">
        <div className="p-6 w-full">
          {id ? <Confirmed id={id} code={code} /> : <CheckEmail email={email} />}
        </div>
      </div>
    </div>
  );
}
