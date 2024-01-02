import { useMemo, useCallback, useContext, createContext } from "react";
import get from "lodash/get";
import size from "lodash/size";
import map from "lodash/map";
import truncate from "lodash/truncate";
import { match } from "ts-pattern";
import { useDebouncedCallback } from "use-debounce";
import {
  useDeskproAppClient,
  useDeskproAppEvents,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useLinkedIssues } from "./useLinkedIssues";
import { getEntityListService } from "../services/deskpro";
import { createIssueCommentService } from "../services/space";
import { getIssueKey } from "../utils";
import { queryClient } from "../query";
import { APP_PREFIX } from "../constants";
import type { FC, PropsWithChildren } from "react";
import type { IDeskproClient, GetStateResponse, TargetAction } from "@deskpro/app-sdk";
import type { Issue } from "../services/space/types";
import type { TicketContext, TicketData } from "../types";

export type ReplyBoxType = "note" | "email";

export type SetSelectionState = (issueId: Issue["id"], selected: boolean, type: ReplyBoxType) => void|Promise<{ isSuccess: boolean }|void>;

export type GetSelectionState = (issueId: Issue["id"], type: ReplyBoxType) => void|Promise<Array<GetStateResponse<string>>>;

export type DeleteSelectionState = (issueId: Issue["id"], type: ReplyBoxType) => void|Promise<boolean|void>;

type ReturnUseReplyBox = {
  setSelectionState: SetSelectionState,
  getSelectionState: GetSelectionState,
  deleteSelectionState: DeleteSelectionState,
};

const noteKey = (ticketId: string, issueId: Issue["id"]|"*") => {
  return `tickets/${ticketId}/${APP_PREFIX}/notes/selection/${issueId}`.toLowerCase();
};

const emailKey = (ticketId: string, issueId: Issue["id"]|"*") => {
  return `tickets/${ticketId}/${APP_PREFIX}/emails/selection/${issueId}`.toLowerCase();
};

const registerReplyBoxNotesAdditionsTargetAction = (
  client: IDeskproClient,
  ticketId: TicketData["ticket"]["id"],
  issueIds: Array<Issue["id"]>,
  issuesMap: Record<Issue["id"], Issue>,
): void|Promise<void> => {
  if (!ticketId) {
    return;
  }

  if (Array.isArray(issueIds) && !size(issueIds)) {
    return client.deregisterTargetAction(`${APP_PREFIX}ReplyBoxNoteAdditions`);
  }

  return Promise
    .all(issueIds.map((issueId: Issue["id"]) => client.getState<{ selected: boolean }>(noteKey(ticketId, issueId))))
    .then((flags) => {
      client.registerTargetAction(`${APP_PREFIX}ReplyBoxNoteAdditions`, "reply_box_note_item_selection", {
        title: "Add to Space",
        payload: issueIds.map((issueId, idx) => {
          const issue = issuesMap[issueId];
          const issueKey = getIssueKey(issue) || truncate(get(issue, ["title"], ""), { length: 20 }) || issue.id;
          return {
            id: issueId,
            title: issueKey,
            selected: flags[idx][0]?.data?.selected ?? false,
          };
        }),
      });
    })
    ;
};

const registerReplyBoxEmailsAdditionsTargetAction = (
  client: IDeskproClient,
  ticketId: TicketData["ticket"]["id"],
  issueIds: Array<Issue["id"]>,
  issuesMap: Record<Issue["id"], Issue>,
): void|Promise<void> => {
  if (!ticketId) {
    return;
  }

  if (Array.isArray(issueIds) && !size(issueIds)) {
    return client.deregisterTargetAction(`${APP_PREFIX}ReplyBoxEmailAdditions`);
  }

  return Promise
    .all(issueIds.map((issueId: Issue["id"]) => {
      return client.getState<{ selected: boolean }>(emailKey(ticketId, issueId))
    }))
    .then((flags) => {
      return client.registerTargetAction(`${APP_PREFIX}ReplyBoxEmailAdditions`, "reply_box_email_item_selection", {
        title: `Add to Space`,
        payload: issueIds.map((issueId, idx) => {
          const issue = issuesMap[issueId];
          const issueKey = getIssueKey(issue) || truncate(get(issue, ["title"], ""), { length: 20 }) || issue.id;
          return {
            id: issueId,
            title: issueKey,
            selected: flags[idx][0]?.data?.selected ?? false,
          };
        }),
      });
    });
};

const ReplyBoxContext = createContext<ReturnUseReplyBox>({
  setSelectionState: () => {},
  getSelectionState: () => {},
  deleteSelectionState: () => {},
});

const useReplyBox = () => useContext<ReturnUseReplyBox>(ReplyBoxContext);

const ReplyBoxProvider: FC<PropsWithChildren> = ({ children }) => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { client } = useDeskproAppClient();
  const { issues } = useLinkedIssues();
  const issuesMap = useMemo(() => (Array.isArray(issues) ? issues : [])
    .reduce<Record<Issue["id"], Issue>>((acc, issue) => {
      acc[issue.id] = issue;
      return acc;
    }, {}), [issues]);

  const ticketId = get(context, ["data", "ticket", "id"]);
  const isCommentOnNote = get(context, ["settings", "default_comment_on_ticket_note"]);
  const isCommentOnEmail = get(context, ["settings", "default_comment_on_ticket_reply"]);

  const setSelectionState: SetSelectionState = useCallback((issueId, selected, type) => {
    if (!ticketId || !client) {
      return
    }

    if (type === "note" && isCommentOnNote) {
      return client.setState(noteKey(ticketId, issueId), { id: issueId, selected })
        .then(() => getEntityListService(client, ticketId))
        .then((issueIds) => registerReplyBoxNotesAdditionsTargetAction(client, ticketId, issueIds, issuesMap))
        .catch(() => {})
    }

    if (type === "email" && isCommentOnEmail) {
      return client?.setState(emailKey(ticketId, issueId), { id: issueId, selected })
        .then(() => getEntityListService(client, ticketId))
        .then((issueIds) => registerReplyBoxEmailsAdditionsTargetAction(client, ticketId, issueIds, issuesMap))
        .catch(() => {})
    }
  }, [client, ticketId, isCommentOnNote, isCommentOnEmail, issuesMap]);

  const getSelectionState: GetSelectionState = useCallback((issueId, type) => {
    if (!ticketId) {
      return
    }

    const key = (type === "email") ? emailKey : noteKey;
    return client?.getState<string>(key(ticketId, issueId))
  }, [client, ticketId]);

  const deleteSelectionState: DeleteSelectionState = useCallback((issueId, type) => {
    if (!ticketId || !client) {
      return;
    }

    const key = (type === "email") ? emailKey : noteKey;

    return client.deleteState(key(ticketId, issueId))
      .then(() => getEntityListService(client, ticketId))
      .then((issueIds) => {
        const register = (type === "email") ? registerReplyBoxEmailsAdditionsTargetAction : registerReplyBoxNotesAdditionsTargetAction;
        return register(client, ticketId, issueIds, issuesMap);
      })
  }, [client, ticketId, issuesMap]);

  useInitialisedDeskproAppClient((client) => {
    if (isCommentOnNote) {
      registerReplyBoxNotesAdditionsTargetAction(client, ticketId, map(issues, "id"), issuesMap);
      client.registerTargetAction(`${APP_PREFIX}OnReplyBoxNote`, "on_reply_box_note");
    }

    if (isCommentOnEmail) {
      registerReplyBoxEmailsAdditionsTargetAction(client, ticketId, map(issues, "id"), issuesMap);
      client.registerTargetAction(`${APP_PREFIX}OnReplyBoxEmail`, "on_reply_box_email");
    }
  }, [issues, ticketId, isCommentOnNote, isCommentOnEmail, issuesMap]);

  const debounceTargetAction = useDebouncedCallback<(a: TargetAction) => void>((action: TargetAction) => match<string>(action.name)
      .with(`${APP_PREFIX}OnReplyBoxEmail`, () => {
        const subjectTicketId = action.subject;
        const email = action.payload.email;

        if (!ticketId || !email || !client) {
          return;
        }

        if (subjectTicketId !== ticketId) {
          return;
        }

        client.setBlocking(true);
        client.getState<{ id: string; selected: boolean }>(emailKey(ticketId, "*"))
          .then((selections) => {
            const issueIds = selections
              .filter(({ data }) => data?.selected)
              .map(({ data }) => data?.id as Issue["id"]);

            return Promise
              .all(issueIds.map((issueId) => createIssueCommentService(client, issueId, { text: email })))
              .then(() => queryClient.invalidateQueries());
          })
          .finally(() => client.setBlocking(false));
      })
      .with(`${APP_PREFIX}OnReplyBoxNote`, () => {
        const subjectTicketId = action.subject;
        const note = action.payload.note;

        if (!ticketId || !note || !client) {
          return;
        }

        if (subjectTicketId !== ticketId) {
          return;
        }

        client.setBlocking(true);
        client.getState<{ id: string; selected: boolean }>(noteKey(ticketId, "*"))
          .then((selections) => {
            const issueIds = selections
              .filter(({ data }) => data?.selected)
              .map(({ data }) => data?.id as Issue["id"]);

            return Promise
              .all(issueIds.map((issueId) => createIssueCommentService(client, issueId, { text: note })))
              .then(() => queryClient.invalidateQueries());
          })
          .finally(() => client.setBlocking(false));
      })
      .with(`${APP_PREFIX}ReplyBoxEmailAdditions`, () => {
        (action.payload ?? []).forEach((selection: { id: string; selected: boolean; }) => {
          const subjectTicketId = action.subject;

          if (ticketId) {
            client?.setState(emailKey(subjectTicketId, selection.id), { id: selection.id, selected: selection.selected })
              .then((result) => {

                if (result.isSuccess) {
                  registerReplyBoxEmailsAdditionsTargetAction(client, ticketId, map(issues, "id"), issuesMap);
                }
              });
          }
        })
      })
      .with(`${APP_PREFIX}ReplyBoxNoteAdditions`, () => {
        (action.payload ?? []).forEach((selection: { id: string; selected: boolean; }) => {
          const subjectTicketId = action.subject;

          if (ticketId) {
            client?.setState(noteKey(subjectTicketId, selection.id), { id: selection.id, selected: selection.selected })
              .then((result) => {
                if (result.isSuccess) {
                  registerReplyBoxNotesAdditionsTargetAction(client, subjectTicketId, map(issues, "id"), issuesMap);
                }
              });
          }
        })
      })
      .run(),
    200
  );

  useDeskproAppEvents({
    onTargetAction: debounceTargetAction,
  }, [context?.data]);

  return (
    <ReplyBoxContext.Provider value={{
      setSelectionState,
      getSelectionState,
      deleteSelectionState,
    }}>
      {children}
    </ReplyBoxContext.Provider>
  );
};

export { useReplyBox, ReplyBoxProvider };
