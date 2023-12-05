import { IDeskproClient } from "@deskpro/app-sdk";
import { REFRESH_TOKEN_PATH } from "../../constants";

const setRefreshTokenService = (client: IDeskproClient, token: string) => {
  return client.setUserState(REFRESH_TOKEN_PATH, token, { backend: true });
};

export { setRefreshTokenService };
