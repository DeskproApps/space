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
import { nbsp } from "../../constants";
import { format } from "../../utils/date";
import { SpaceLogo, Status, DeskproTickets, Tags } from "../common";
import type { FC, MouseEvent } from "react";
import type { IssueType } from "../../types";

export type Props = {
  issue: IssueType,
  onClickTitle?: () => void,
};

const IssueItem: FC<Props> = ({ issue, onClickTitle }) => {
  const fullName = useMemo(() => {
    const name = [
      get(issue, ["assignee", "name", "firstName"]),
      get(issue, ["assignee", "name", "lastName"]),
    ].filter(Boolean);

    return size(name) ? name.join(" ") : get(issue, ["assignee", "username"]);
  }, [issue]);

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
        {...(!issue.link ? {} : { icon: <SpaceLogo/> })}
        {...(!issue.link ? {} : { link: issue.link })}
      />
      <TwoProperties
        leftLabel="Project"
        leftText={(
          <P5>
            {get(issue, ["project", "name"]) || "-"}
            {issue.project?.link && (
              <>
                {nbsp}<LinkIcon href={issue.project.link} />
              </>
            )}
          </P5>
        )}
        rightLabel="Issue ID"
        rightText={issue.key}
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
        leftText={format(issue.createdAt)}
        rightLabel="Due Date"
        rightText={format(issue.dueDate)}
      />
      {Boolean(size(issue.tags)) && (
        <Property label="Tags" text={<Tags tags={issue.tags}/>} />
      )}
      {Boolean(fullName) && (
        <Property
          label="Assignee"
          text={(
            <Member name={fullName}/>
          )}
        />
      )}
    </>
  );
};

export { IssueItem };
