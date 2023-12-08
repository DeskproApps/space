import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Nothing } from "../../types";
import type { IssueInput, Project, Issue } from "./types";

const updateIssueService = (
  client: IDeskproClient,
  projectId: Project["id"],
  issueId: Issue["id"],
  issueInput: IssueInput,
) => {
  return baseRequest<Nothing>(client, {
    url: `/projects/id:${projectId}/planning/issues/id:${issueId}`,
    method: "PATCH",
    data: issueInput,
  });
};

export { updateIssueService };
