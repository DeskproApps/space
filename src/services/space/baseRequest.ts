import { isEmpty, isString } from "lodash-es";
import { proxyFetch } from "@deskpro/app-sdk";
import { refreshAccessTokenService } from "./refreshAccessTokenService";
import { BASE_URL, placeholders } from "../../constants";
import { getQueryParams } from "../../utils";
import { SpaceError } from "./SpaceError";
import type { Request } from "../../types";

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
  const options: RequestInit = {
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let res = await dpFetch(requestUrl, options);

  if (res.status === 401) {
    await refreshAccessTokenService(client);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
