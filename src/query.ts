import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 2000,
    },
  },
});

const QueryKey = {
  PROJECTS: "projects",
  ISSUES: "issues",
  ISSUE: "issue",
  ISSUE_STATUSES: "issue_statuses",
  ISSUE_TAGS: "issue_tags",
  PROJECT_MEMBERS: "project_members",
  LINKED_ISSUES: "linked_issues",
}

export { queryClient, QueryKey };
