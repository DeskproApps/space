import size from "lodash/size";
import { P5 } from "@deskpro/deskpro-ui";
import { LinkIcon } from "@deskpro/app-sdk";
import { useExternalLinks } from "../../../hooks";
import { getIssueKey } from "../../../utils";
import { nbsp } from "../../../constants";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Issue } from "../../../services/space/types";

const Parent = ({ issue }: { issue?: Maybe<Issue> }) => {
  const { getIssueLink } = useExternalLinks();
  const issueKey = getIssueKey(issue);
  const issueLink = getIssueLink(issue);

  if (!issueKey) {
    return (
      <P5>-</P5>
    );
  }

  return (
    <P5 style={{ marginBottom: 0 }}>
      {issueKey}
      {Boolean(issueLink) && nbsp}
      {Boolean(issueLink) && (<LinkIcon href={issueLink as string} />)}
    </P5>
  )
};

const Parents: FC<{ issues?: Maybe<Issue[]> }> = ({ issues }) => {
  if (!Array.isArray(issues) || !size(issues)) {
    return (
      <P5>-</P5>
    );
  }

  return (
    <>
      {issues.map((issue) => <Parent key={issue.id} issue={issue} />)}
    </>
  );
};

export { Parent, Parents };
