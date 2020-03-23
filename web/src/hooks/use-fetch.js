import React from "react";

export default function useFetch() {
  async function post(path, body) {
    try {
      const response = await fetch(path, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      console.error(err);
    } finally {
      console.log("done");
    }
  }

  return { post };
}
