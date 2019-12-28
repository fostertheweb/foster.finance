import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link, navigate } from "@reach/router";
import SavingsImage from "../../images/savings";

export default function() {
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  // const showPasswordButton = (
  //   <button
  //     icon={showPassword ? "eye-open" : "eye-off"}
  //     onClick={() => setShowPassword(!showPassword)}
  //     minimal={true}
  //   />
  // );

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
          <div className="my-6">
            <label htmlFor="email" className="font-bold block my-1">
              Email
            </label>
            <input
              className="bg-white text-md p-3 border-gray-400 border-2 rounded shadow-inner focus:outline-none focus:shadow-outline w-full"
              id="email"
              placeholder="Email address"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-6">
            <label htmlFor="password" className="font-bold block my-1">
              Password
            </label>
            <input
              className="text-md p-3 border-gray-400 border-2 rounded shadow-inner focus:outline-none focus:shadow-outline w-full"
              id="password"
              type={false ? "text" : "password"}
              placeholder="Password for your account here"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            value="Log in"
            type="submit"
            disabled={!email || !password || user.loading}
            className="block rounded font-bold bg-green-500 hover:bg-green-600 cursor-pointer text-white border-green-700 border-2 py-2 px-4"
          />
        </form>
      </div>
      <SavingsImage classes="lg:w-1/3 md:w-1/2 w-3/4 mx-4 md:-ml-20 lg:-ml-32" />
    </div>
  );
}
