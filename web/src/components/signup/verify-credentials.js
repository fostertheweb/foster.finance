import React from "react";

export default function() {
  return (
    <div>
      <h2>Email verification required</h2>
      <p className="my-4">Click the link sent to your email address.</p>
      <button className="block rounded font-bold bg-green-500 hover:bg-green-600 cursor-pointer text-white border-green-700 border-2 py-2 px-4">
        Resend Email
      </button>
    </div>
  );
}
