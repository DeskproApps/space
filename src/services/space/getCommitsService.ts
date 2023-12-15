import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, Project, components } from "./types";

const getCommitsService = (
  client: IDeskproClient,
  projectId: Project["id"],
  repositoryId: components["schemas"]["PR_RepositoryInfo"]["id"],
  q: string,
) => {
  return baseRequest<Pagination<components["schemas"]["GitCommitInfo"]>>(client, {
    url: `/projects/id:${projectId}/repositories/${repositoryId}/commits`,
    queryParams:{
      query: `"${q}"`,
      $fields: "data(id,message),totalCount,next",
    },
  });
};

export { getCommitsService };
