import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, IssueTag, Project } from "./types";

const getTagsServices = (
  client: IDeskproClient,
  projectId: Project["id"],
) => {
  return baseRequest<Pagination<IssueTag>>(client, {
    url: `/projects/${projectId}/planning/tags`,
  });
};

export { getTagsServices };
