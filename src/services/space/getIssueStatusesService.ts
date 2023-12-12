import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, IssueStatus } from "./types";

const getIssueStatusesService = (
  client: IDeskproClient,
  projectId: Project["id"],
) => {
  return baseRequest<IssueStatus[]>(client, {
    url: `/projects/${projectId}/planning/issues/statuses`,
  });
};

export { getIssueStatusesService };
