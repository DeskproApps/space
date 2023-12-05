import { baseRequest } from "./baseRequest";
import { placeholders } from "../../constants";
import { getQueryParams } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";

const refreshAccessTokenService = (client: IDeskproClient) => {
  const data = new FormData();
  data.append("grant_type", "refresh_token");
  data.append("refresh_token", placeholders.REFRESH_TOKEN);

  return baseRequest(client, {
    rawUrl: `${placeholders.URL}/oauth/token`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic __client_id+':'+client_secret.base64__`,
    },
    data: getQueryParams(data),
  });
};

export { refreshAccessTokenService };
