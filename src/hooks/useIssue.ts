import { useMemo } from "react";
import size from "lodash/size";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { useIssues } from "./useIssues";
import { getIssueMessagesService } from "../services/space";
import { QueryKey } from "../query";
import { isIssueComment } from "../utils";
import type { Maybe } from "../types";
import type { Issue, IssueComment } from "../services/space/types";

export type Result = {
  isLoading: boolean,
  issue: Maybe<Issue>,
  comments: IssueComment[],
};

type UseIssue = (issueId: Maybe<Issue["id"]>) => Result;

const useIssue: UseIssue = (issueId) => {
  const { issues, isLoading } = useIssues(!issueId ? [] :[issueId]);

  const messages = useQueryWithClient(
    [QueryKey.ISSUE_MESSAGES, issueId as Issue["id"]],
    (client) => getIssueMessagesService(client, issueId as Issue["id"]),
    { enabled: Boolean(issueId) },
  );

  const comments = useMemo(() => {
    if (!Array.isArray(messages.data?.messages) || !size(messages.data?.messages)) {
      return [];
    }

    return messages.data?.messages.filter(isIssueComment) as IssueComment[];
  }, [messages.data?.messages]);

  return {
    isLoading: [isLoading, messages.isLoading, Boolean(issueId)].every(Boolean),
    issue: issues[0],
    comments,
  };
};

export { useIssue };
