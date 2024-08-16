import { size } from "lodash-es";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getIssuesService } from "../services/space";
import { QueryKey } from "../query";
import type { Issue } from "../services/space/types";

type UseIssues = (issueIds?: Array<Issue["id"]>) => {
  isLoading: boolean,
  issues: Issue[],
};

const useIssues: UseIssues = (issueIds = []) => {
  const issues = useQueryWithClient(
    [QueryKey.ISSUES, ...issueIds],
    (client) => getIssuesService(client, issueIds),
    { enabled: size(issueIds) > 0 },
  );

  return {
    isLoading: issues.isLoading && size(issueIds) > 0,
    issues: issues.data || [],
  };
};

export { useIssues };
