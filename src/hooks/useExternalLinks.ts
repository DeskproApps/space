import { useMemo, useCallback } from "react";
import get from "lodash/get";
import find from "lodash/find";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { getProjectsService } from "../services/space";
import { getIssueLink, getProjectLink } from "../utils";
import { QueryKey } from "../query";
import type { Maybe } from "../types";
import type { Issue, Project } from "../services/space/types";

export type Result = {
  getIssueLink: (issue?: Maybe<Issue>) => Maybe<string>,
  getProjectLink: (project?: Maybe<Project>) => Maybe<string>,
};

type UseExternalLinks = () => Result;

const useExternalLinks: UseExternalLinks = () => {
  const { context } = useDeskproLatestAppContext();
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);
  const settings = useMemo(() => get(context, ["settings"]), [context]);

  const projectLink = useCallback((project?: Maybe<Project>) => {
    return getProjectLink(settings, project);
  }, [settings]);

  const issueLink = useCallback((issue?: Maybe<Issue>) => {
    const project = find(get(projects, ["data", "data"]) || [], { id: issue?.projectId });

    return getIssueLink(settings, project, issue);
  }, [settings, projects]);

  return {
    getIssueLink: issueLink,
    getProjectLink: projectLink,
  };
};

export { useExternalLinks };
