import { useMemo, useCallback } from "react";
import get from "lodash/get";
import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { getIssueLink, getProjectLink, getAttachmentLink } from "../utils";
import type { Maybe } from "../types";
import type { Issue, Project } from "../services/space/types";

export type Result = {
  getIssueLink: (issue?: Maybe<Issue>) => Maybe<string>,
  getProjectLink: (project?: Maybe<Project>) => Maybe<string>,
  getAttachmentLink: (attachId?: Maybe<string>) => Maybe<string>,
};

type UseExternalLinks = () => Result;

const useExternalLinks: UseExternalLinks = () => {
  const { context } = useDeskproLatestAppContext();
  const settings = useMemo(() => get(context, ["settings"]), [context]);

  const projectLink = useCallback((project?: Maybe<Project>) => {
    return getProjectLink(settings, project);
  }, [settings]);

  const issueLink = useCallback((issue?: Maybe<Issue>) => {
    return getIssueLink(settings, issue?.projectRef, issue);
  }, [settings]);

  const attachLink = useCallback((attachId?: Maybe<string>) => {
    return getAttachmentLink(settings, attachId);
  }, [settings]);

  return {
    getIssueLink: issueLink,
    getProjectLink: projectLink,
    getAttachmentLink: attachLink,
  };
};

export { useExternalLinks };
