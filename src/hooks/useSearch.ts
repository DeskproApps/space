import { useMemo } from "react";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getProjectsService,
  searchIssuesService,
} from "../services/space";
import { useIssues } from "../hooks";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { Project, Issue } from "../services/space/types";

export type Result = {
  isLoading: boolean,
  projects: Project[],
  issues: Issue[],
};

type UseSearch = (projectId?: Maybe<Project["id"]>, q?: string) => Result;

const useSearch: UseSearch = (projectId, q) => {
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  const searchIssues = useQueryWithClient(
    [QueryKey.ISSUES, projectId as string, q as string],
    (client) => searchIssuesService(client, projectId as Project["id"], { q }),
    { enabled: Boolean(projectId) && Boolean(q) },
  );
  const issueIds = useMemo(() => {
    return (searchIssues.data?.data ?? []).map(({ id }) => id);
  }, [searchIssues.data]);

  const issues = useIssues(issueIds);

  return {
    isLoading: [searchIssues, issues].some(({ isLoading }) => isLoading) && Boolean(q),
    projects: projects.data?.data ?? [],
    issues: issues.issues,
  };
};

export { useSearch };
