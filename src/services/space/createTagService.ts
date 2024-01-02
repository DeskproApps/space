import { baseRequest } from "./baseRequest";
import { fields } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { IssueTag, Project } from "./types";

const createTagService = (
  client: IDeskproClient,
  projectId: Project["id"],
  tagName: string,
) => {
  return baseRequest<IssueTag>(client, {
    url: `/projects/id:${projectId}/planning/tags`,
    method: "POST",
    queryParams: {
      $fields: fields.TAG,
    },
    data: {
      path: [tagName],
    },
  });
};

export { createTagService };
