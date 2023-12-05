import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import {
  useIssue,
  useSetTitle,
  useRegisterElements,
} from "../../hooks";
import { getIssueKey } from "../../utils";
import { ViewIssue } from "../../components";
import type { FC } from "react";

const ViewIssuePage: FC = () => {
  const { issueId } = useParams();
  const { issue, comments, isLoading } = useIssue(issueId);

  useSetTitle(getIssueKey(issue));

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink issue",
        payload: { type: "unlink", issue },
      }],
    });
  }, [issue]);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <ViewIssue issue={issue} comments={comments} />
  );
};

export { ViewIssuePage };
