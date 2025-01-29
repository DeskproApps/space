import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import { createIssueService } from "../../services/space";
import {
  useSetTitle,
  useAsyncError,
  useRegisterElements,
  useLinkedAutoComment,
} from "../../hooks";
import { getEntityMetadata } from "../../utils";
import { DEFAULT_ERROR } from "../../constants";
import { CreateIssue } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { IssueInput, Project } from "../../services/space/types";

const CreateIssuePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<{ ticket: { id: number } }, { client_id: string, space_url: string }>();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const { asyncErrorHandler } = useAsyncError();
  const { addLinkComment } = useLinkedAutoComment();
  const ticketId = context?.data?.ticket.id;

  const onNavigateToLink = useCallback(() => navigate("/issues/link"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((projectId: Project["id"], values: IssueInput) => {
    if (!client || !ticketId || !projectId || !values) {
      return Promise.resolve();
    }

    setError(null);

    return createIssueService(client, projectId, values)
      .then((issue) => Promise.all([
        setEntityService(client, String(ticketId), issue.id, getEntityMetadata(issue)),
        addLinkComment(issue),
      ]))
      .then(() => navigate("/home"))
      .catch((err) => {
        const error = err?.data?.error_description || DEFAULT_ERROR;

        if (error) {
          setError(error)
        } else {
          asyncErrorHandler(err);
        }
      })
  }, [asyncErrorHandler, client, navigate, ticketId, addLinkComment]);

  useSetTitle("Link Issue");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateIssue
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { CreateIssuePage };
