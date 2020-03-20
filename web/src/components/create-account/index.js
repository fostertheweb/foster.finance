import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";
import Input from "../input";
import Alert from "../alert";
import Button from "../button";
import { faBullseyePointer } from "@fortawesome/pro-duotone-svg-icons";
import { getRandomEmail } from "../../shared/placeholders";
import { Panel } from "../panel";

export default function() {
  const { signUp, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    signUp(email, password);
  }

  return (
    <Panel title="Join">
      <>
        <form onSubmit={e => handleSubmit(e)} className="mt-8">
          <div className="mb-6">
            <Input
              large
              id="email"
              label="Email"
              placeholder={getRandomEmail()}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Input
              large
              type="password"
              id="password"
              label="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              large
              className="w-full"
              type="submit"
              text="Create Account"
              icon={faBullseyePointer}
              loading={loading}
              disabled={!email || !password || loading}
            />
          </div>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="ff-link">
            Sign in
          </Link>
        </p>
      </>
      {error ? (
        <Alert intent="error" message={error.message || error} />
      ) : (
        <p className="block p-4">try it out, full refund available</p>
      )}
    </Panel>
  );
}
