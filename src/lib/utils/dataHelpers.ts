'use server';
'server-only';
import { getAccessToken } from "@auth0/nextjs-auth0";

const createEndpoint = (endpoint: string) => {
  if (endpoint.length === 0) {
    throw new RangeError("endpoint cannot be empty");
    return;
  }

  let host = process.env.SERVER_HOST || "http://localhost:5001";

  if (host.slice(-1) === "/") {
    host = host.slice(0, -1);
  }

  if (endpoint.substring(0, 1) === "/") {
    return host + endpoint;
  }

  return host + "/" + endpoint;
};

export const getAuthToken = async () => {
  try {
    const { accessToken } = (await getAccessToken({}) || undefined);

    if (accessToken !== undefined) {
      return `Bearer ${accessToken}`;
    } 
  
    return undefined;
    
  } catch (error: any) {
    return { error: error.message};
  };
};

export const httpRequest = async (
  endpoint: string,
  payload: {} | null,
  httpVerb: string,
  refreshType: {} | null = null,
  isPublic: boolean = false
) => {
  try {
    const requestInit: RequestInit = {
      method: httpVerb,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: payload ? JSON.stringify(payload) : null,
    };

    if (!isPublic) {
      const token = await getAuthToken();
      if (typeof token === "string" && token) {
        requestInit.headers = { ...requestInit.headers, Authorization: token };
      };
    };

    if (refreshType) {
      Object.assign(requestInit, refreshType);
    };

    const response = await fetch(createEndpoint(endpoint) || "", requestInit);

    //TODO: handle this error on 401 and 403
    // if (response.ok === false) {
    //   const errtext = `test ${response.statusText}`
    //   throw new Error(errtext);
    // }

    if (response.statusText === "No Content") {
      return null;
    } else if (response) {
      let data = await response.json();
      data.status = response.status;
      return data;
    }
    throw new URIError("failed to fetch data");

  } catch (error: any) {
    return { error: error.message }
  };
};

