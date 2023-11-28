import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, IssueTag, Pagination } from "./types";

const getTagsServices = (
  client: IDeskproClient,
  projectId: Project["id"],
) => {
  return baseRequest<Pagination<IssueTag>>(client, {
    url: `/projects/${projectId}/planning/tags`,
  });
};

export { getTagsServices };
