import { useMemo, useState, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
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
} from "../../hooks";
import { DEFAULT_ERROR } from "../../constants";
import { CreateIssue } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { IssueInput, Project } from "../../services/space/types";

const CreateIssuePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const { asyncErrorHandler } = useAsyncError();
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const onNavigateToLink = useCallback(() => navigate("/issues/link"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit = useCallback((projectId: Project["id"], values: IssueInput) => {
    if (!client || !ticketId || !projectId || isEmpty(values)) {
      return Promise.resolve();
    }

    setError(null);

    return createIssueService(client, projectId, values)
      .then((issue) => setEntityService(client, ticketId, issue.id))
      .then(() => navigate("/home"))
      .catch((err) => {
        const error = get(err, ["data", "error_description"]) || DEFAULT_ERROR;

        if (error) {
          setError(error)
        } else {
          asyncErrorHandler(err);
        }
      })
  }, [asyncErrorHandler, client, navigate, ticketId]);

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
