import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link, navigate } from "@reach/router";
import SavingsImage from "../../images/savings";
import Input, { Submit } from "../input";

export default function() {
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-4">
      <div className="lg:w-1/4 md:w-1/3 w-3/4 mx-4 z-10">
        <h2 className="my-0 text-xl">Log In</h2>
        <p className="block my-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 underline">
            Sign up
          </Link>
        </p>
        <form onSubmit={e => handleSubmit(e)} className="my-4">
          <Input id="email" label="Email" onChange={e => setEmail(e.target.value)} />
          <Input
            type="password"
            id="password"
            label="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <Submit text="Log in" disabled={!email || !password || user.loading} />
        </form>
      </div>
      <SavingsImage classes="lg:w-1/3 md:w-1/2 w-3/4 mx-4 md:-ml-20 lg:-ml-32" />
    </div>
  );
}
