import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/pro-duotone-svg-icons";
import { useAuth } from "../../hooks/use-auth";

export default function(props) {
  const { resendSignUp } = useAuth();
  const email = props.location.search.split("=")[1];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-8">
      <div className="mx-4">
        <FontAwesomeIcon icon={faPaperPlane} size="5x" color="green" />
      </div>
      <div className="lg:w-1/3 md:w-1/2 w-3/4 mx-4">
        <h2>Email verification required</h2>
        <p className="my-4">
          You should have received an email from us with a link to verify your email address.
        </p>
        <p>
          <button className="link" onClick={() => resendSignUp(email)}>
            Send the email again
          </button>
        </p>
      </div>
    </div>
  );
}
