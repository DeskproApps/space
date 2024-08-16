import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useIssues } from "./useIssues";
import { getEntityListService } from "../services/deskpro";
import { QueryKey } from "../query";
import type { Issue } from "../services/space/types";
import type { TicketData } from "../types";

export type Result = {
  isLoading: boolean,
  issues: Issue[],
};

type UseLinkedIssues = () => Result;

const useLinkedIssues: UseLinkedIssues = () => {
  const { context } = useDeskproLatestAppContext();
  const ticketId = context?.data?.ticket.id;

  const linkedIds = useQueryWithClient(
    [QueryKey.LINKED_ISSUES, ticketId as TicketData["ticket"]["id"]],
    (client) => getEntityListService(client, ticketId as TicketData["ticket"]["id"]),
    { enabled: Boolean(ticketId) },
  );

  const issues = useIssues(linkedIds.data || []);

  return {
    isLoading: [linkedIds, issues].some(({ isLoading }) => isLoading) && Boolean(linkedIds.data?.length),
    issues: issues.issues,
  };
};

export { useLinkedIssues };
