import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useIssue,
  useSetTitle,
  useRegisterElements,
} from "../../hooks";
import { getIssueKey } from "../../utils";
import { ViewIssue } from "../../components";
import type { FC } from "react";

const ViewIssuePage: FC = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const { issue, comments, isLoading } = useIssue(issueId);

  const onNavigateToAddComment = useCallback(() => {
    navigate(`/issues/${issueId}/comments/new`);
  }, [navigate, issueId]);

  useSetTitle(getIssueKey(issue));

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink issue",
        payload: { type: "unlink", issue },
      }],
    });
    issue?.id && registerElement("edit", {
      type: "edit_button",
      payload: {
        type: "changePage",
        path: `/issues/edit/${issue.id}`,
      },
    });
  }, [issue]);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <ViewIssue
      issue={issue}
      comments={comments}
      onNavigateToAddComment={onNavigateToAddComment}
    />
  );
};

export { ViewIssuePage };
