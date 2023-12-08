import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Nothing } from "../../types";
import type { Issue, Project, IssueTag } from "./types";

const addIssueTagService = (
  client: IDeskproClient,
  projectId: Project["id"],
  issueId: Issue["id"],
  tagId: IssueTag["id"],
) => {
  return baseRequest<Nothing>(client, {
    url: `/projects/id:${projectId}/planning/issues/id:${issueId}/tags/${tagId}`,
    method: "POST"
  });
};

export { addIssueTagService };
