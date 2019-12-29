import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link, navigate } from "@reach/router";
import CreditCardImage from "../../images/credit-card";
import Input, { Submit } from "../input";

export default function() {
  const { signUp, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    signUp(email, password);
  }

  if (user.data && !user.error) {
    navigate(`/signup/verify?email=${email}`);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-4">
      <CreditCardImage classes="lg:w-1/4 md:w-1/3 w-1/2 mx-4" />
      <div className="lg:w-1/3 md:w-1/2 w-3/4 md:-ml-12">
        <>
          <h2 className="my-0 text-xl">Get started</h2>
          <p className="block my-4">
            After creating an account you will connect to your bank so we can view your transactions
            and help you save more money.
          </p>
          <p className="my-4">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Log in
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
            <Submit
              text="Sign up"
              loading={user.loading}
              disabled={!email || !password || user.loading}
            />
          </form>
        </>
      </div>
    </div>
  );
}
