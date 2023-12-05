import { IDeskproClient } from "@deskpro/app-sdk";
import { REFRESH_TOKEN_PATH } from "../../constants";

const removeRefreshTokenService = (client: IDeskproClient) => {
  return client.deleteUserState(REFRESH_TOKEN_PATH);
};

export { removeRefreshTokenService };
