import { useMemo, useState, useCallback } from "react";
import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { useParams, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import {
  updateIssueService,
  updateIssueTagsService,
} from "../../services/space";
import {
  useIssue,
  useSetTitle,
  useAsyncError,
  useRegisterElements,
} from "../../hooks";
import { DEFAULT_ERROR } from "../../constants";
import { getIssueTagsToUpdate } from "../../components/IssueForm";
import { EditIssue } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { IssueInput, Project } from "../../services/space/types";

const EditIssuePage: FC = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const { isLoading, issue } = useIssue(issueId);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const onCancel = useCallback(() => {
    navigate(`/issues/view/${issue?.id}`);
  }, [navigate, issue]);

  const onSubmit = useCallback((projectId: Project["id"], values: IssueInput) => {
    if (!client || !projectId || isEmpty(values) || !issue?.id || !ticketId) {
      return Promise.resolve();
    }

    setError(null);

    return updateIssueService(client, projectId, issue.id, values)
      .then(() => updateIssueTagsService(client, projectId, issue.id, getIssueTagsToUpdate(issue, values)))
      .then(() => setEntityService(client, ticketId, issue.id))
      .then(() => navigate(`/issues/view/${issue.id}`))
      .catch((err) => {
        const error = get(err, ["data", "error_description"]) || DEFAULT_ERROR;

        if (error) {
          setError(Array.isArray(error) ? map(error, "message") : error)
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [client, ticketId, navigate, issue, asyncErrorHandler]);

  useSetTitle("Edit Issue");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <EditIssue
      issue={issue}
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { EditIssuePage };
