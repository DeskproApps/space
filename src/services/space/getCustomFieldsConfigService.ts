import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, CustomFieldData } from "./types";

const getCustomFieldsConfigService = (
  client: IDeskproClient,
  projectId: Project["id"],
) => {
  return baseRequest<CustomFieldData[]>(client, {
    url: `/custom-fields-v2/issueTracker:project:id:${projectId}/fields`,
  });
};

export { getCustomFieldsConfigService };
