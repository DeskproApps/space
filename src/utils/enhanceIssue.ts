import find from "lodash/find";
import get from "lodash/get";
import toUpper from "lodash/toUpper";
import isString from "lodash/isString";
import pick from "lodash/pick";
import { getIssueLink, getProjectLink } from "./getExternalLinks";
import type { IssueType, Maybe, Settings } from "../types";
import type { Project, Issue, IssueTag, MemberOnProject, IssueStatus } from "../services/space/types";

const enhanceIssue = (
  settings: Maybe<Settings>,
  issue: Issue,
  projects?: Project[],
  tags?: IssueTag[],
  members?: MemberOnProject[],
  statuses?: IssueStatus[],
): IssueType => {
  const project = find(projects, { id: issue.projectId }) as Project;
  const projectKey = get(project, ["key", "key"]);
  const issueKey = (!projectKey || !issue.number)
    ? null
    : toUpper(`${projectKey}-${issue.number}`);
  const createdAt = isString(get(issue, ["creationTime"]))
    ? get(issue, ["creationTime"])
    : get(issue, ["creationTime", "iso"]) || null;
  const dueDate = isString(get(issue, ["dueDate"]))
    ? get(issue, ["dueDate"])
    : get(issue, ["dueDate", "iso"]) || null;
  const issueTags = (Array.isArray(issue.tags) ? issue.tags : [])
    .map(({ id }: Pick<IssueTag, "id">) => find(tags, { id }))
    .filter(Boolean) as IssueTag[];
  const assignee = find(members, ({ profile }) => {
    return profile?.id === issue.assignee?.id;
  });

  return {
    ...pick(issue, ["id", "title", "number"]),
    key: issueKey,
    link: getIssueLink(settings, project, issue),
    createdAt,
    dueDate,
    tags: issueTags,
    assignee: assignee?.profile,
    project: !project ? null : {
      id: get(project, ["id"]),
      name: get(project, ["name"]),
      key: projectKey,
      link: getProjectLink(settings, project),
    },
    status: find(statuses, { id: get(issue, ["status", "id"]) }),
  }
};

export { enhanceIssue };
