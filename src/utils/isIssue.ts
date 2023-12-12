import has from "lodash/has";
import type { Maybe } from "../types";
import type { Issue } from "../services/space/types";

const isIssue = (issue?: Maybe<Issue>): issue is Issue => {
  return has(issue, ["id"]);
};

export { isIssue };
