import { baseRequest } from "./baseRequest";
import { IDeskproClient } from "@deskpro/app-sdk";
import { fields } from "../../constants";
import type { Issue } from "./types";

const getIssuesService = (
  client: IDeskproClient,
  issueIds: Array<Issue["id"]>,
): Promise<Issue[]> => {
  return baseRequest(client, {
    url: `/issues/get-by-ids`,
    method: "POST",
    queryParams: {
      $fields: fields.ISSUE,
    },
    data: JSON.stringify({
      "issueIdentifiers": issueIds.map((issueId) => `id:${issueId}`),
    }),
  });
};

export { getIssuesService };
