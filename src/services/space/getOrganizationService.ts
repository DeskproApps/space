import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Organization } from "./types";

const getOrganizationService = (client: IDeskproClient) => {
  return baseRequest<Organization>(client, {
    url: "/organization",
  });
};

export { getOrganizationService };
