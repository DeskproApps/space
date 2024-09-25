import type { Maybe, Settings } from "../types";
import type { Issue, Project } from "../services/space/types";

const getIssueLink = (
  settings?: Maybe<Settings>,
  project?: Maybe<Project>,
  issue?: Maybe<Issue>,
): Maybe<string> => {
  const spaceUrl = settings?.space_url;
  const key = project?.key.key;

  if (!spaceUrl || !key || !issue?.number) {
    return;
  }

  return `${spaceUrl}/p/${key.toLocaleLowerCase()}/issues/${issue.number}`;
};

const getProjectLink = (
  settings?: Maybe<Settings>,
  project?: Maybe<Project>,
): Maybe<string> => {
  const spaceUrl = settings?.space_url;
  const key = project?.key.key;

  if (!spaceUrl || !key) {
    return;
  }

  return `${spaceUrl}/p/${key.toLowerCase()}`;
};

const getAttachmentLink = (
  settings?: Maybe<Settings>,
  attachId?: Maybe<string>,
): Maybe<string> => {
  const spaceUrl = settings?.space_url;

  if (!spaceUrl || !attachId) {
    return;
  }

  return `${spaceUrl}/d/${attachId}?f=0`;
};

export { getIssueLink, getProjectLink, getAttachmentLink };
