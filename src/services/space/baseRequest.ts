import isEmpty from "lodash/isEmpty";
import isString from "lodash";
import { proxyFetch } from "@deskpro/app-sdk";
import {
  BASE_URL,
  placeholders,
  ACCESS_TOKEN_PATH,
  REFRESH_TOKEN_PATH,
} from "../../constants";
import { getQueryParams } from "../../utils";
import { SpaceError } from "./SpaceError";
import type { Request, FetchOptions } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  data,
  method = "GET",
  queryParams = {},
  headers: customHeaders,
}) => {
  const dpFetch = await proxyFetch(client);

  const baseUrl = rawUrl ? rawUrl : `${BASE_URL}/api/http${url || ""}`;
  const params = getQueryParams(queryParams);

  const requestUrl = `${baseUrl}${isEmpty(params) ? "": `?${params}`}`;
  const options: FetchOptions = {
    method,
    headers: {
      "Authorization": `Bearer ${placeholders.ACCESS_TOKEN}`,
      ...customHeaders,
    },
  };

  if (!isEmpty(data)) {
    options.body = isString(data) ? data as string : JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  let res = await dpFetch(requestUrl, options);

  if (res.status === 401) {
    const refreshData = new FormData();
    refreshData.append("grant_type", "refresh_token");
    refreshData.append("refresh_token", placeholders.REFRESH_TOKEN);

    await dpFetch(`${placeholders.URL}/oauth/token`, {
      method: "POST",
      body: getQueryParams(refreshData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic __client_id+':'+client_secret.base64__`,
      },
    })
      .then((res) => res.json())
      .then(({ access_token, refresh_token }) => Promise.all([
        client.setUserState(ACCESS_TOKEN_PATH, access_token, { backend: true }),
        client.setUserState(REFRESH_TOKEN_PATH, refresh_token, { backend: true }),
      ]));

    res = await dpFetch(requestUrl, options);
  }

  if (res.status < 200 || res.status > 399) {
    let errorData;

    try {
      errorData = await res.json();
    } catch (e) {
      errorData = {};
    }

    throw new SpaceError({
      status: res.status,
      data: errorData,
    });
  }

  let result;

  try {
    result = await res.json();
  } catch (e) {
    return {};
  }

  return result;
};

export { baseRequest };
