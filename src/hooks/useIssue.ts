import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { useIssues } from "./useIssues";
import {
  getIssueMessagesService,
  getFieldsVisibilityService,
} from "../services/space";
import { QueryKey } from "../query";
import { isIssueComment, normalizeFieldsVisibility } from "../utils";
import type { Maybe } from "../types";
import type {
  Issue,
  Project,
  IssueComment,
  FieldVisibility,
} from "../services/space/types";

export type Result = {
  isLoading: boolean,
  issue: Maybe<Issue>,
  comments: IssueComment[],
  visibility: Record<FieldVisibility["field"], FieldVisibility["visible"]>,
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

  const projectId = useMemo(() => get(issues, [0, "projectId"]), [issues]);

  const fieldsVisibility = useQueryWithClient(
    [QueryKey.FIELDS_VISIBILITY, projectId as Project["id"]],
    (client) => getFieldsVisibilityService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const visibility = useMemo(() => {
    return normalizeFieldsVisibility(fieldsVisibility.data);
  }, [fieldsVisibility.data]);

  return {
    isLoading: [
      isLoading,
      Boolean(issueId),
      messages.isLoading,
      fieldsVisibility.isLoading,
    ].every(Boolean),
    issue: issues[0],
    comments,
    visibility,
  };
};

export { useIssue };
