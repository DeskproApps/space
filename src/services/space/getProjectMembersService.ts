import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, Project, MemberOnProject } from "./types";

const getProjectMembersService = (
  client: IDeskproClient,
  projectId: Project["id"],
) => {
  return baseRequest<Pagination<MemberOnProject>>(client, {
    url: `/projects/${projectId}/people/members`,
    queryParams: "$fields=data(profile(id,name,username))",
  });
};

export { getProjectMembersService };
