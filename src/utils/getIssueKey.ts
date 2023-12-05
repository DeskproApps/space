import get from "lodash/get";
import type { Maybe } from "../types";
import type { Issue } from "../services/space/types";

const getIssueKey = (issue: Maybe<Issue>): string => {
  const key = get(issue, ["projectRef", "key", "key"]);
  const number = get(issue, ["number"]);

  if (!key || !number) {
    return "";
  }

  return `${key}-T-${number}`
};

export { getIssueKey };
