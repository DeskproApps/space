import get from "lodash/get";
import toLower from "lodash/toLower";
import type { Maybe, Settings } from "../types";
import type { Issue, Project } from "../services/space/types";

const getIssueLink = (
  settings?: Maybe<Settings>,
  project?: Maybe<Project>,
  issue?: Maybe<Issue>,
): Maybe<string> => {
  const spaceUrl = get(settings, ["space_url"]);
  const key = get(project, ["key", "key"]);

  if (!spaceUrl || !key || !issue?.number) {
    return;
  }

  return `${spaceUrl}/p/${toLower(key)}/issues/${issue.number}`;
};

const getProjectLink = (
  settings?: Maybe<Settings>,
  project?: Maybe<Project>,
): Maybe<string> => {
  const spaceUrl = get(settings, ["space_url"]);
  const key = get(project, ["key", "key"]);

  if (!spaceUrl || !key) {
    return;
  }

  return `${spaceUrl}/p/${toLower(key)}`;
};

export { getIssueLink, getProjectLink };
