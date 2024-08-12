import { useCallback, useState } from "react";
import get from "lodash/get";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { createIssueCommentService } from "../services/space";
import type { Issue, IssueComment } from "../services/space/types";
import type { TicketContext } from "../types";

export type Result = {
  isLoading: boolean,
  addLinkComment: (issue: Issue) => Promise<void|IssueComment>,
  addUnlinkComment: (issue: Issue) => Promise<void|IssueComment>,
};

const getLinkedMessage = (ticketId: string, link?: string): string => {
  return `Linked to Deskpro ticket ${ticketId}${link ? `, ${link}` : ""}`
};

const getUnlinkedMessage = (ticketId: string, link?: string): string => {
  return `Unlinked from Deskpro ticket ${ticketId}${link ? `, ${link}` : ""}`
};

const useLinkedAutoComment = (): Result => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isEnable = get(context, ["settings", "add_comment_when_linking"], false);
  const ticketId = get(context, ["data", "ticket", "id"]);
  const permalink = get(context, ["data", "ticket", "permalinkUrl"]);

  const addLinkComment = useCallback((issue: Issue) => {
    if (!client || !isEnable || !ticketId) {
      return Promise.resolve();
    }

    setIsLoading(true);
    return createIssueCommentService(
      client,
      issue.id,
      { text: getLinkedMessage(ticketId, permalink) },
    )
      .finally(() => setIsLoading(false));
  }, [client, isEnable, ticketId, permalink]);

  const addUnlinkComment = useCallback((issue: Issue) => {
    if (!client || !isEnable || !ticketId) {
      return Promise.resolve();
    }

    setIsLoading(true)
    return createIssueCommentService(
      client,
      issue.id,
      { text: getUnlinkedMessage(ticketId, permalink) },
    )
      .finally(() => setIsLoading(false));
  }, [client, isEnable, ticketId, permalink]);

  return { isLoading, addLinkComment, addUnlinkComment };
};

export {
  getLinkedMessage,
  getUnlinkedMessage,
  useLinkedAutoComment,
};
