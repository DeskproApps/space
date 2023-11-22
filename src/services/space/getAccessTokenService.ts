import { baseRequest } from "./baseRequest";
import { getQueryParams } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { AccessToken } from "./types";

const getAccessTokenService = (
  client: IDeskproClient,
  code: string,
  redirectUri: string,
) => {
  const data = new FormData();
  data.append("grant_type", "authorization_code");
  data.append("code", code);
  data.append("redirect_uri", redirectUri);

  return baseRequest<AccessToken>(client, {
    url: "/oauth/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic __client_id+':'+client_secret.base64__`,
    },
    data: getQueryParams(data),
  });
};

export { getAccessTokenService };
