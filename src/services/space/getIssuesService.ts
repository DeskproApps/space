import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, Issue, IssueQueryParams } from "./types";

type Params = {
  q?: IssueQueryParams["query"],
};

const getIssuesService = (
  client: IDeskproClient,
  projectId: string,
  params?: Params,
) => {
  return baseRequest<Pagination<Issue>>(client, {
    url: `/projects/${projectId}/planning/issues`,
    queryParams: {
      sorting: "TITLE",
      descending: "false",
      ...(!params?.q ? {} : { query: params.q }),
    },
  });
};

export { getIssuesService };
