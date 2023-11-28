import { useMemo } from "react";
import get from "lodash/get";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import {
  getTagsServices,
  getIssuesService,
  getProjectsService,
  getIssueStatusesService,
  getProjectMembersService,
} from "../../services/space";
import { QueryKey } from "../../query";
import { enhanceIssue } from "../../utils";
import type { Maybe, IssueType } from "../../types";
import type { Project, Issue } from "../../services/space/types";

type UseSearch = (projectId?: Maybe<Project["id"]>, q?: string) => {
  isLoading: boolean,
  projects: Project[],
  issues: IssueType[],
};

const useSearch: UseSearch = (projectId, q) => {
  const { context } = useDeskproLatestAppContext();
  const settings = useMemo(() => get(context, ["settings"]), [context]);

  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  const fetchIssues = useQueryWithClient(
    [QueryKey.ISSUES, projectId as string, q as string],
    (client) => getIssuesService(client, projectId as Project["id"], { q }),
    { enabled: Boolean(projectId) && Boolean(q) },
  );

  const members = useQueryWithClient(
    [QueryKey.PROJECT_MEMBERS, projectId as Project["id"]],
    (client) => getProjectMembersService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const statuses = useQueryWithClient(
    [QueryKey.ISSUE_STATUSES, projectId as Project["id"]],
    (client) => getIssueStatusesService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const fetchTags = useQueryWithClient(
    [QueryKey.ISSUE_TAGS, projectId as Project["id"]],
    (client) => getTagsServices(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const issues = (get(fetchIssues, ["data", "data"], []) || [])
    .map((issue: Issue) => enhanceIssue(
      settings,
      issue,
      get(projects, ["data", "data"]) || [],
      get(fetchTags, ["data", "data"]) || [],
      get(members, ["data", "data"]) || [],
      get(statuses, ["data"]) || [],
    ));

  return {
    isLoading: fetchIssues.isLoading && Boolean(q),
    projects: get(projects, ["data", "data"]) || [],
    issues,
  };
};

export { useSearch };
