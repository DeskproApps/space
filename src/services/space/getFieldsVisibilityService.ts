import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, FieldsVisibility } from "./types";

const getFieldsVisibilityService = (
  client: IDeskproClient,
  projectId: Project["id"],
) => {
  return baseRequest<FieldsVisibility>(client, {
    url: `/projects/id:${projectId}/planning/issues/fields/visibility`,
  });
};

export { getFieldsVisibilityService };
