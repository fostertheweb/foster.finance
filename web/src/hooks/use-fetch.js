import { useAuth } from "./use-auth";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

export function useFetch() {
  const { jwt } = useAuth();

  const defaultOptions = {
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
  };

  async function get(url, query) {
    try {
      const uri = new URL(baseURL + url);
      if (query) {
        Object.entries(query).map(([key, value]) => uri.searchParams.append(key, value));
      }
      const response = await fetch(uri, {
        ...defaultOptions,
        method: "GET",
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error) {
      throw error;
    }
  }

  async function post(url, body) {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        ...defaultOptions,
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error) {
      throw error;
    }
  }

  async function patch(url, body) {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        ...defaultOptions,
        method: "PATCH",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error) {
      throw error;
    }
  }

  async function destroy(url, query) {
    try {
      const uri = new URL(baseURL + url);
      if (query) {
        Object.entries(query).map(([key, value]) => uri.searchParams.append(key, value));
      }
      const response = await fetch(uri, {
        ...defaultOptions,
        method: "DELETE",
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorResponse = await response.json();
        throw errorResponse;
      }
    } catch (error) {
      throw error;
    }
  }

  return { get, post, patch, destroy };
}
