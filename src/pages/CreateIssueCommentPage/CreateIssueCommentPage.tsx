import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSetTitle, useAsyncError } from "../../hooks";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useRegisterElements } from "../../hooks";
import { createIssueCommentService } from "../../services/space";
import { DEFAULT_ERROR } from "../../constants";
import { getValues } from "../../components/IssueCommentForm";
import { CreateIssueComment } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/IssueCommentForm";

const CreateIssueCommentPage: FC = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const onCancel = useCallback(() => {
    navigate(`/issues/view/${issueId}`);
  }, [navigate, issueId]);


  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !issueId) {
      return Promise.resolve();
    }

    setError(null);

    return createIssueCommentService(client, issueId, getValues(data))
      .then(() => navigate(`/issues/view/${issueId}`))
      .catch((err) => {
        const error = err.data?.err || DEFAULT_ERROR;

        if (error) {
          setError(error);
        } else {
          asyncErrorHandler(err);
        }
      })
  }, [client, issueId, navigate, asyncErrorHandler]);

  useSetTitle("Comment");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateIssueComment
      error={error}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export { CreateIssueCommentPage };
