import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import CreditCardImage from "../../images/credit-card";
import Input from "../input";
import Alert from "../alert";
import Button from "../button";

export default function() {
  const { signIn, loading, error, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password);
  }

  if (user && !loading) {
    navigate("/app/home");
  }

  if (error && error.code === "UserNotConfirmedException") {
    navigate(`/create-account/verify?email=${email}`);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-4">
      <div className="lg:w-1/3 md:w-1/2 w-3/4 relative">
        <div className="w-1/3 absolute top-0 left-0 -ml-40">
          <CreditCardImage />
        </div>
        <>
          <h2 className="my-0 text-xl">Sign in</h2>
          <p className="my-4">
            Don't have an account?{" "}
            <Link to="/create-account" className="link">
              Create account
            </Link>
          </p>
          <form onSubmit={e => handleSubmit(e)} className="my-4">
            <Input
              id="email"
              label="Email"
              placeholder="iwant2savemoney@gmail.com"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              placeholder="not anything like 12345"
              onChange={e => setPassword(e.target.value)}
            />
            <div className="flex align-items justify-end">
              {error ? <Alert intent="error" message={error.message || error} /> : null}
              <Button
                type="submit"
                text="Sign in"
                loading={loading}
                disabled={!email || !password || loading}
              />
            </div>
          </form>
        </>
      </div>
    </div>
  );
}
