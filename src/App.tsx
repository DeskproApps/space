import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useLogout, useUnlinkIssue } from "./hooks";
import {
  isUnlinkPayload,
  isNavigatePayload,
} from "./utils";
import {
  HomePage,
  LoginPage,
  ViewIssuePage,
  EditIssuePage,
  LinkIssuesPage,
  LoadingAppPage,
  CreateIssuePage,
  AdminCallbackPage,
  CreateIssueCommentPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { logout, isLoading: isLoadingLogout } = useLogout();
  const { unlink, isLoading: isLoadingUnlink } = useUnlinkIssue();
  const isLoading = [isLoadingLogout, isLoadingUnlink].some((isLoading) => isLoading);

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
      .with("logout", logout)
      .with("unlink", () => isUnlinkPayload(payload) && unlink(payload.issue))
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Routes>
      <Route path="/admin/callback" element={<AdminCallbackPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/issues/link" element={<LinkIssuesPage />} />
      <Route path="/issues/view/:issueId" element={<ViewIssuePage />} />
      <Route path="/issues/create" element={<CreateIssuePage />} />
      <Route path="/issues/edit/:issueId" element={<EditIssuePage />} />
      <Route path="/issues/:issueId/comments/new" element={<CreateIssueCommentPage />} />
      <Route index element={<LoadingAppPage />} />
    </Routes>
  );
};

export { App };
