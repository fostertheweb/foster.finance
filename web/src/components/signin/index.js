import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "../input";
import Alert from "../alert";
import Button from "../button";
import { faSignIn } from "@fortawesome/pro-duotone-svg-icons";
import { getRandomEmail } from "../../shared/placeholders";
import Logo from "../logo";

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
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-stretch w-1/2 bg-white rounded shadow">
        <div className="p-6 border-r border-gray-200 w-1/2">
          <div className="w-full mb-6">
            <Logo />
          </div>
          <h2 className="my-0 text-lg">Sign in</h2>
          <p className="my-4">
            Don't have an account?{" "}
            <Link to="/create-account" className="ff-link">
              Create account
            </Link>
          </p>
          <form onSubmit={e => handleSubmit(e)} className="my-4">
            <Input
              id="email"
              label="Email"
              placeholder={getRandomEmail()}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <div className="flex align-items justify-end">
              {error ? <Alert intent="error" message={error.message || error} /> : null}
              <Button
                type="submit"
                text="Sign in"
                icon={faSignIn}
                loading={loading}
                disabled={!email || !password || loading}
              />
            </div>
          </form>
        </div>
        <div className="w-1/2 rounded-r bg-green-100 text-green-500 text-center font-medium flex items-center justify-center">
          welcome back
        </div>
      </div>
    </div>
  );
}
