import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements, useLinkedIssues } from "../../hooks";
import { Home } from "../../components";
import type { FC } from "react";
import type { Issue } from "../../services/space/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { issues, isLoading } = useLinkedIssues();

  const onNavigateToIssue = useCallback((issueId: Issue["id"]) => {
    navigate(`/issues/view/${issueId}`);
  }, [navigate]);

  useSetTitle("Space");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/issues/link" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Log Out",
        payload: {
          type: "logout",
        },
      }],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      issues={issues}
      onNavigateToIssue={onNavigateToIssue}
    />
  );
};

export { HomePage };
