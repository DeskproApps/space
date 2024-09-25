import { baseRequest } from "./baseRequest";
import { fields } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue, IssueComment, IssueCommentInput } from "./types";

const createIssueCommentService = (
  client: IDeskproClient,
  issueId: Issue["id"],
  data: IssueCommentInput,
) => {
  return baseRequest<IssueComment>(client, {
    url: `/chats/messages/send-message`,
    method: "POST",
    queryParams: {
      $fields: fields.COMMENT,
    },
    data: {
      channel: `issue:id:${issueId}`,
      content: {
        className: "ChatMessage.Text",
        ...data,
      }
    },
  });
};

export { createIssueCommentService };
