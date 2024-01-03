import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import {
  useIssue,
  useSetTitle,
  useAsyncError,
  useRegisterElements,
} from "../../hooks";
import { updateChecklistItemCompleteService } from "../../services/space";
import { queryClient } from "../../query";
import { getIssueKey } from "../../utils";
import { ViewIssue } from "../../components";
import type { FC } from "react";
import type { Issue, IssueSubItem } from "../../services/space/types";

const ViewIssuePage: FC = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const { issue, comments, isLoading } = useIssue(issueId);

  const onNavigateToAddComment = useCallback(() => {
    navigate(`/issues/${issueId}/comments/new`);
  }, [navigate, issueId]);

  const onCompleteItem = useCallback((
    listId: Issue["subItemsList"]["id"],
    itemId: IssueSubItem["id"],
    resolved: IssueSubItem["simpleDone"],
  ) => {
    if (!client || !listId || !itemId) {
      return Promise.resolve();
    }

    return updateChecklistItemCompleteService(client, listId, itemId, resolved)
      .then(() => queryClient.invalidateQueries())
      .catch(asyncErrorHandler);
  }, [client, asyncErrorHandler]);

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
      onCompleteItem={onCompleteItem}
      onNavigateToAddComment={onNavigateToAddComment}
    />
  );
};

export { ViewIssuePage };
