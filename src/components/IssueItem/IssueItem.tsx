import { useCallback } from "react";
import get from "lodash/get";
import { P5 } from "@deskpro/deskpro-ui";
import {
  Title,
  Link,
  LinkIcon,
  Property,
  TwoProperties,
} from "@deskpro/app-sdk";
import { useExternalLinks } from "../../hooks";
import { nbsp } from "../../constants";
import { format } from "../../utils/date";
import { getIssueKey } from "../../utils";
import { SpaceLogo, Status, DeskproTickets } from "../common";
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
        rightLabel="Created"
        rightText={format(get(issue, ["creationTime", "iso"]))}
      />
      <Property
        label="Deskpro Tickets"
        text={<DeskproTickets entityId={issue.id}/>}
      />
    </>
  );
};

export { IssueItem };
