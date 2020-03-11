import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faPaperPlane,
  faEnvelopeOpenText,
  faUserCheck,
} from "@fortawesome/pro-duotone-svg-icons";
import { parse } from "query-string";
import { useAuth } from "../../hooks/use-auth";
import Button from "../button";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading";
import Error from "../error";
import Logo from "../logo";

function CheckEmail({ email }) {
  const { resendSignUp, loading } = useAuth();

  return (
    <>
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
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;
  if (error && error.code === "NotAuthorizedException") {
    navigate("/");
  }
  if (error) return <Error message={error.message} />;

  return (
    <>
      <div className="mx-4">
        <FontAwesomeIcon icon={faUserCheck} size="5x" color="#5f6c7b" />
      </div>
      <h2>Email Verified</h2>
      <p className="my-4">Wow thank you.</p>
    </>
  );
}

export default function() {
  const location = useLocation();
  const { id, code, email } = parse(location.search);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-stretch w-1/2 bg-white rounded shadow">
        <div className="p-6 border-r border-gray-200 w-1/2">
          <div className="flex items-center justify-start">
            <Logo />
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              size="lg"
              className="text-gray-400 fill-current ml-2 -mb-2"
            />
            <h2 className="text-gray-500 tracking-wide font-normal smallcaps text-xl ml-2 -mb-1">
              Verify Email
            </h2>
          </div>
          {id ? <Confirmed id={id} code={code} /> : <CheckEmail email={email} />}
        </div>
        <div className="w-1/2 rounded-r bg-green-100 text-green-500 flex items-center justify-center">
          <p className="block p-4">poggers</p>
        </div>
      </div>
    </div>
  );
}
