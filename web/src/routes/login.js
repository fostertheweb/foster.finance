import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import Logo from "../components/logo";
import { useAuth } from "../hooks/use-auth";
import Image from "../images/savings.svg";

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
    <div className="flex">
      <div className="p-4 bg-purple-100">
        <Logo />
        <div className="my-8">
          <h3 className="font-bold text-lg my-2">Log In</h3>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 underline">
              Sign up
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="block my-8">
            <div className="block my-4">
              <label className="block my-1" htmlFor="email">
                Email
              </label>
              <input
                className="p-2 border-gray-400 border rounded shadow-inner focus:outline-none focus:shadow-outline"
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="block my-4">
              <label className="block my-1" htmlFor="password">
                Password
              </label>
              <input
                className="p-2 border-gray-400 border rounded shadow-inner focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                className="p-2 font-bold text-white border border-blue-500 bg-blue-400 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!email || !password || user.loading}
                value="Log In"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        <img className="p-6 max-w-full max-h-screen" src={Image} alt="person with piggy bank" />
      </div>
    </div>
  );
}
