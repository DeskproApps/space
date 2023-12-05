import { useMemo, useCallback } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { P5 } from "@deskpro/deskpro-ui";
import {
  Title,
  Link,
  Member,
  LinkIcon,
  Property,
  TwoProperties,
} from "@deskpro/app-sdk";
import { useExternalLinks } from "../../hooks";
import { nbsp } from "../../constants";
import { format } from "../../utils/date";
import { getIssueKey, getFullName } from "../../utils";
import { SpaceLogo, Status, DeskproTickets, Tags } from "../common";
import type { FC, MouseEvent } from "react";
import type { Issue } from "../../services/space/types";

export type Props = {
  issue: Issue,
  onClickTitle?: () => void,
};

const IssueItem: FC<Props> = ({ issue, onClickTitle }) => {
  const { getIssueLink, getProjectLink } = useExternalLinks();
  const issueLink = getIssueLink(issue);
  const projectLink = getProjectLink(get(issue, ["projectRef"]));
  const fullName = useMemo(() => getFullName(get(issue, ["assignee"])), [issue]);

  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? get(issue, ["title"])
          : (<Link href="#" onClick={onClick}>{get(issue, ["title"])}</Link>)
        }
        marginBottom={10}
        {...(!issueLink ? {} : { icon: <SpaceLogo/> })}
        {...(!issueLink ? {} : { link: issueLink })}
      />
      <TwoProperties
        leftLabel="Project"
        leftText={(
          <P5>
            {get(issue, ["projectRef", "name"]) || "-"}
            {Boolean(projectLink) && (
              <>
                {nbsp}<LinkIcon href={projectLink as string} />
              </>
            )}
          </P5>
        )}
        rightLabel="Issue ID"
        rightText={getIssueKey(issue)}
      />
      <TwoProperties
        leftLabel="Status"
        leftText={!issue.status ? "-" : (
          <Status status={issue.status}/>
        )}
        rightLabel="Deskpro Tickets"
        rightText={<DeskproTickets entityId={issue.id}/>}
      />
      <TwoProperties
        leftLabel="Created"
        leftText={format(get(issue, ["creationTime", "iso"]))}
        rightLabel="Due Date"
        rightText={format(get(issue, ["dueDate", "iso"]))}
      />
      {Boolean(size(issue.tags)) && (
        <Property label="Tags" text={<Tags tags={issue.tags}/>} />
      )}
      {Boolean(fullName) && (
        <Property
          label="Assignee"
          text={<Member name={fullName}/>}
        />
      )}
    </>
  );
};

export { IssueItem };
