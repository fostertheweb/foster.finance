import React, { useState } from "react";
// import { useAuth } from "../../hooks/use-auth";
import { Link } from "@reach/router";
import VerifyCredentials from "./verify-credentials";
import CreditCardImage from "../../images/credit-card";

export default function() {
  // const auth = useAuth();
  const [auth, setAuth] = useState(false);
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

  function handleSubmit(e) {
    e.preventDefault();
    setAuth(true);
    // auth.signUp(email, password);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-4">
      <CreditCardImage classes="lg:w-1/4 md:w-1/3 w-1/2 mx-4" />
      <div className="lg:w-1/3 md:w-1/2 w-3/4 md:-ml-12">
        {/* {auth.user.data && !auth.user.error ? ( */}
        {auth ? (
          <VerifyCredentials />
        ) : (
          <>
            <h2 className="my-0 text-xl">Get started</h2>
            <p className="block my-4">
              After creating an account you will connect to your bank so we can view your
              transactions and help you save more money.
            </p>
            <p className="my-4">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Log in
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
                  placeholder="Create your password..."
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <input
                value="Sign up"
                type="submit"
                disabled={!email || !password || auth.loading}
                className="block rounded font-bold bg-green-500 hover:bg-green-600 cursor-pointer text-white border-green-700 border-2 py-2 px-4"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
