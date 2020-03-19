import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "../input";
import Alert from "../alert";
import Button from "../button";
import { faSignIn } from "@fortawesome/pro-duotone-svg-icons";
import { getRandomEmail } from "../../shared/placeholders";
import { Panel } from "../panel";

export default function() {
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password);
  }

  if (error && error.code === "UserNotConfirmedException") {
    navigate(`/verify?email=${email}`);
  }

  return (
    <Panel title="Sign in">
      <>
        <form onSubmit={e => handleSubmit(e)} className="mt-8">
          <Input
            large
            id="email"
            label="Email"
            placeholder={getRandomEmail()}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            large
            type="password"
            id="password"
            label="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex align-items justify-end">
            <Button
              large
              className="w-full"
              type="submit"
              text="Sign in"
              icon={faSignIn}
              loading={loading}
              disabled={!email || !password || loading}
            />
          </div>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/create-account" className="ff-link">
            Create account
          </Link>
        </p>
      </>
      {error ? (
        <Alert intent="error" message={error.message || error} />
      ) : (
        <>
          <span role="img" aria-label="hand waving" className="mr-2">
            👋
          </span>
          welcome back dear friend
        </>
      )}
    </Panel>
  );
}
