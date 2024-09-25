import type { Maybe } from "../types";
import type { Issue } from "../services/space/types";

const getIssueKey = (issue: Maybe<Issue>): string => {
  const key = issue?.projectRef?.key.key;
  const number = issue?.number;

  if (!key || !number) {
    return "";
  }

  return `${key}-T-${number}`
};

export { getIssueKey };
