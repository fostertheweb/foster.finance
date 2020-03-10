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
          <div className="flex items-center justify-start">
            <Logo />
            <h2 className="text-gray-500 font-normal text-lg ml-3 -mb-1">Sign in</h2>
          </div>
          <form onSubmit={e => handleSubmit(e)} className="mt-8">
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
        </div>
        <div className="w-1/2 rounded-r bg-green-100 text-green-500 text-center font-medium flex items-center justify-center">
          {error ? <Alert intent="error" message={error.message || error} /> : "welcome back"}
        </div>
      </div>
    </div>
  );
}
