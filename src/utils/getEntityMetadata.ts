import { getIssueKey } from "./getIssueKey";
import { getFullName } from "./getFullName";
import type { Issue } from "../services/space/types";
import type { EntityMetadata } from "../types";

const getEntityMetadata = (
  issue?: Issue,
): undefined|EntityMetadata => {
  if (!issue) {
    return;
  }

  const userName = issue.assignee?.username;
  const fullName = getFullName(issue?.assignee);

  return {
    id: issue.id,
    key: getIssueKey(issue),
    title: issue.title,
    project: issue.projectRef.name,
    status: issue.status.name,
    tags: (Array.isArray(issue.tags) ? issue.tags : []).map(({ name }) => name),
    assignee: (!userName || !fullName) ? undefined : { username: userName, name: fullName },
  };
};

export { getEntityMetadata };
