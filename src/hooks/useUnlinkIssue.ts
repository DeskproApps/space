import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { deleteEntityService } from "../services/deskpro";
import { useLinkedAutoComment } from "./useLinkedAutoComment";
import { useAsyncError } from "./useAsyncError";
import { useReplyBox } from "./useReplyBox";
import { useDeskproTag } from "./useDeskproTag";
import type { Issue } from "../services/space/types";

export type Result = {
  isLoading: boolean,
  unlink: (issue: Issue) => void,
};

const useUnlinkIssue = (): Result => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext();
  const { asyncErrorHandler } = useAsyncError();
  const { addUnlinkComment } = useLinkedAutoComment();
  const { deleteSelectionState } = useReplyBox();
  const { removeDeskproTag } = useDeskproTag();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ticketId = context?.data?.ticket.id;

  const unlink = useCallback((issue: Issue) => {
    if (!client || !issue || !ticketId) {
      return;
    }

    setIsLoading(true);

    Promise.all([
      deleteEntityService(client, ticketId, issue.id),
      addUnlinkComment(issue),
      removeDeskproTag(issue),
      deleteSelectionState(issue.id, "note"),
      deleteSelectionState(issue.id, "email"),
    ])
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      })
      .catch(asyncErrorHandler);
  }, [client, ticketId, navigate, asyncErrorHandler, addUnlinkComment, deleteSelectionState, removeDeskproTag]);

  return { isLoading, unlink };
};

export { useUnlinkIssue };
