import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, Project } from "./types";

const getProjectsService = (client: IDeskproClient) => {
  return baseRequest<Pagination<Project>>(client, {
    url: "/projects",
  });
};

export { getProjectsService };
