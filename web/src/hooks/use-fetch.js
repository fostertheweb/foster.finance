import { useAuth } from "./use-auth";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

export function useFetch() {
  const { jwt } = useAuth();

  return async function (path, options) {
    if (options.queryParams) {
      path += (path.indexOf("?") === -1 ? "?" : "&") + queryParams(options.queryParams);
      delete options.queryParams;
    }

    const url = baseURL + path;

    const response = await fetch(url, {
      body: options.body ? JSON.stringify(options.body) : null,
      method: options.method | "GET",
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
    });

    const payload = await response.json();

    if (response.ok) {
      return payload;
    } else {
      throw payload;
    }
  };
}

function queryParams(params) {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
    .join("&");
}
