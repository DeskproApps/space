import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { getIssueKey } from "./getIssueKey";
import { getFullName } from "./getFullName";
import type { Issue } from "../services/space/types";
import type { EntityMetadata } from "../types";

const getEntityMetadata = (
  issue?: Issue,
): undefined|EntityMetadata => {
  if (isEmpty(issue)) {
    return;
  }

  const userName = get(issue, ["assignee", "username"]);
  const fullName = getFullName(issue?.assignee);

  return {
    id: get(issue, ["id"], ""),
    key: getIssueKey(issue),
    title: get(issue, ["title"], ""),
    project: get(issue, ["projectRef", "name"]),
    status: get(issue, ["status", "name"]),
    tags: map(issue?.tags, "name"),
    assignee: (!userName || !fullName) ? undefined : { username: userName, name: fullName },
  };
};

export { getEntityMetadata };
