import { baseRequest } from "./baseRequest";
import { fields } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, Team } from "./types";

const getTeamsService = (client: IDeskproClient) => {
  return baseRequest<Pagination<Team>>(client, {
    url: "/team-directory/teams",
    queryParams: {
      $fields: `data(${fields.TEAM})`,
    },
  });
};

export { getTeamsService };
