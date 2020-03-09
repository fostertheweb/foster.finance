import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "../input";
import Alert from "../alert";
import Button from "../button";
import { faBullseyePointer } from "@fortawesome/pro-duotone-svg-icons";
import { getRandomEmail } from "../../shared/placeholders";

export default function() {
  const { signUp, loading, error, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (user && !loading) {
    navigate("/app/home");
  }

  function handleSubmit(e) {
    e.preventDefault();
    signUp(email, password);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-6">
      <div className="lg:w-1/3 md:w-1/2 w-3/4 relative">
        <>
          <h2 className="my-0 text-xl">Get started</h2>
          <p className="block my-4">
            After creating an account you will connect to your bank so we can view your transactions
            and help you save more money.
          </p>
          <p className="my-4">
            Already have an account?{" "}
            <Link to="/signin" className="link">
              Sign in
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
            <div className="flex items-center justify-end">
              {error ? <Alert intent="error" message={error.message || error} /> : null}
              <Button
                type="submit"
                text="Create Account"
                icon={faBullseyePointer}
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
