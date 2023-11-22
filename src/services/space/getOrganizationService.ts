import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";

const getOrganizationService = (client: IDeskproClient) => {
  return baseRequest(client, {
    url: "/api/http/organization",
  });
};

export { getOrganizationService };
