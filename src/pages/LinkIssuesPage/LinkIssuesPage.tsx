import { useState, useCallback, useEffect } from "react";
import { cloneDeep } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import {
  LoadingSpinner,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import {
  useSetTitle,
  useReplyBox,
  useAsyncError,
  useDeskproTag,
  useRegisterElements,
  useLinkedAutoComment,
} from "../../hooks";
import { useSearch } from "../../hooks";
import { getEntityMetadata } from "../../utils";
import { LinkIssues } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Project, Issue } from "../../services/space/types";

const LinkIssuesPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<{ ticket: { id: number } }, { client_id: string, space_url: string }>();;
  const { asyncErrorHandler } = useAsyncError();
  const { addLinkComment } = useLinkedAutoComment();
  const { setSelectionState } = useReplyBox();
  const { addDeskproTag } = useDeskproTag();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [projectId, setProjectId] = useState<Maybe<Project["id"]>>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);
  const { issues, projects, isLoading } = useSearch(projectId, searchQuery);
  const ticketId = context?.data?.ticket.id;

  const onNavigateToCreate = useCallback(() => navigate("/issues/create"), [navigate]);

  const onChangeSelectedIssue = useCallback((issue: Issue) => {
    let newSelectedIssues = cloneDeep(selectedIssues);

    if (selectedIssues.some((selectedIssue) => issue.id === selectedIssue.id)) {
      newSelectedIssues = selectedIssues.filter((selectedCard) => {
        return selectedCard.id !== issue.id;
      });
    } else {
      newSelectedIssues.push(issue);
    }

    setSelectedIssues(newSelectedIssues);
  }, [selectedIssues]);

  const onChangeSearchQuery = useDebouncedCallback(setSearchQuery, 1000);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onLinkIssues = useCallback(() => {
    if (!client || !ticketId || !selectedIssues.length) {
      return;
    }

    setIsSubmitting(true);

    Promise.all([
      ...selectedIssues.map((issue) => setEntityService(client, String(ticketId), issue.id, getEntityMetadata(issue))),
      ...selectedIssues.map((issue) => addLinkComment(issue)),
      ...selectedIssues.map((issue) => addDeskproTag(issue)),
      ...selectedIssues.map((issue) => setSelectionState(issue.id, true, "email")),
      ...selectedIssues.map((issue) => setSelectionState(issue.id, true, "note")),
    ])
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler)
      .finally(() => setIsSubmitting(false));
  }, [client, navigate, ticketId, selectedIssues, asyncErrorHandler, addLinkComment, setSelectionState, addDeskproTag]);

  useSetTitle("Link Issue");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  useEffect(() => {
    if (projects?.length > 0) {
      setProjectId(projects[0].id);
    }
  }, [projects]);

  if (!projects.length) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <LinkIssues
      issues={issues}
      projects={projects}
      isLoading={isLoading}
      onChangeSearchQuery={onChangeSearchQuery}
      onChangeProject={setProjectId}
      isSubmitting={isSubmitting}
      onCancel={onCancel}
      selectedIssues={selectedIssues}
      onLinkIssues={onLinkIssues}
      onChangeSelectedIssue={onChangeSelectedIssue}
      onNavigateToCreate={onNavigateToCreate}
    />
  );
};

export { LinkIssuesPage };
