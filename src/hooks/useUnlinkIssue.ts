import { useState, useMemo, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { deleteEntityService } from "../services/deskpro";
import { useLinkedAutoComment } from "./useLinkedAutoComment";
import { useAsyncError } from "./useAsyncError";
import type { TicketContext } from "../types";
import type { Issue } from "../services/space/types";

export type Result = {
  isLoading: boolean,
  unlink: (issue: Issue) => void,
};

const useUnlinkIssue = (): Result => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();
  const { addUnlinkComment } = useLinkedAutoComment();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ticketId = useMemo(() => get(context, ["data", "ticket", "id"]), [context]);

  const unlink = useCallback((issue: Issue) => {
    if (!client || isEmpty(issue)) {
      return;
    }

    setIsLoading(true);

    Promise.all([
      deleteEntityService(client, ticketId, issue.id),
      addUnlinkComment(issue),
    ])
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      })
      .catch(asyncErrorHandler);
  }, [client, ticketId, navigate, asyncErrorHandler, addUnlinkComment]);

  return { isLoading, unlink };
};

export { useUnlinkIssue };
