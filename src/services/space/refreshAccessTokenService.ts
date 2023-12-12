import { proxyFetch } from "@deskpro/app-sdk";
import {
  setAccessTokenService,
  setRefreshTokenService,
} from "../deskpro";
import { placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";

const refreshAccessTokenService = async (client: IDeskproClient) => {
  const dpFetch = await proxyFetch(client);

  return dpFetch(`${placeholders.URL}/oauth/token`, {
    method: "POST",
    body: [
      "grant_type=refresh_token",
      `refresh_token=${placeholders.REFRESH_TOKEN}`,
    ].join("&"),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic __client_id+':'+client_secret.base64__`,
    },
  })
    .then((res) => res.json())
    .then(({ access_token, refresh_token }) => Promise.all([
      setAccessTokenService(client, access_token),
      setRefreshTokenService(client, refresh_token),
    ]));
};

export { refreshAccessTokenService };
