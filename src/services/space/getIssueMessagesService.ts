import { baseRequest } from "./baseRequest";
import { MESSAGE_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue, Messages } from "./types";

const getIssueMessagesService = (
  client: IDeskproClient,
  issueId: Issue["id"],
) => {
  return baseRequest<Messages>(client, {
    url: "/chats/messages",
    queryParams: {
      channel: `issue:id:${issueId}`,
      sorting: "FromNewestToOldest",
      batchSize: "50",
      $fields: MESSAGE_FIELDS.join(","),
    },
  });
};

export { getIssueMessagesService };
