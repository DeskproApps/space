import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useIssues } from "./useIssues";
import { getEntityListService } from "../services/deskpro";
import { QueryKey } from "../query";
import type { Issue } from "../services/space/types";

export type Result = {
  isLoading: boolean,
  issues: Issue[],
};

type UseLinkedIssues = () => Result;

const useLinkedIssues: UseLinkedIssues = () => {
  const { context } = useDeskproLatestAppContext<{ ticket: { id: number } }, { client_id: string, space_url: string }>();
  const ticketId = context?.data?.ticket.id;

  const linkedIds = useQueryWithClient(
    [QueryKey.LINKED_ISSUES, String(ticketId)],
    (client) => getEntityListService(client, String(ticketId)),
    { enabled: Boolean(ticketId) },
  );

  const issues = useIssues(linkedIds.data || []);

  return {
    isLoading: [linkedIds, issues].some(({ isLoading }) => isLoading) && Boolean(linkedIds.data?.length),
    issues: issues.issues,
  };
};

export { useLinkedIssues };
