import { baseRequest } from "./baseRequest";
import { fields } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { IssueInput, Project, Issue } from "./types";

const createIssueService = (
  client: IDeskproClient,
  projectId: Project["id"],
  issueInput: IssueInput,
) => {
  return baseRequest<Issue>(client, {
    url: `/projects/${projectId}/planning/issues`,
    method: "POST",
    queryParams: {
      $fields: fields.ISSUE,
    },
    data: issueInput,
  });
};

export { createIssueService };
