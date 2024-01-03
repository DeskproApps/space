import { useMemo } from "react";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { P5, Stack, AttachmentTag } from "@deskpro/deskpro-ui";
import {
  Title,
  Member,
  Property,
  LinkIcon,
  TwoProperties,
} from "@deskpro/app-sdk";
import { useExternalLinks,  } from "../../../hooks";
import { format } from "../../../utils/date";
import { getIssueKey, getFullName } from "../../../utils";
import { nbsp } from "../../../constants";
import {
  Tags,
  Status,
  Parents,
  Markdown,
  SpaceLogo,
  DeskproTickets,
} from "../../common";
import type { FC } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { Maybe } from "../../../types";
import type { Issue } from "../../../services/space/types";

export type Props = {
  issue?: Maybe<Issue>,
};

const Info: FC<Props> = ({ issue }) => {
  const { getIssueLink, getProjectLink, getAttachmentLink } = useExternalLinks();
  const issueLink = getIssueLink(issue);
  const projectLink = getProjectLink(get(issue, ["projectRef"]));
  const fullName = useMemo(() => getFullName(get(issue, ["assignee"])), [issue]);

  return (
    <>
      <Title
        title={issue?.title}
        marginBottom={10}
        icon={<SpaceLogo/>}
        {...(!issueLink ? {} : { icon: <SpaceLogo/> })}
        {...(!issueLink ? {} : { link: issueLink })}
      />

      <Property
        label="Description"
        text={<Markdown text={get(issue, ["description"]) || "-"} />}
      />
      <Property
        label="Project"
        text={(
          <P5>
            {get(issue, ["projectRef", "name"]) || "-"}
            {Boolean(projectLink) && (
              <>
                {nbsp}<LinkIcon href={projectLink as string} />
              </>
            )}
          </P5>
        )}
      />
      <TwoProperties
        leftLabel="Issue ID"
        leftText={getIssueKey(issue)}
        rightLabel="Parent issues"
        rightText={<Parents issues={issue?.parents}/>}
      />
      <TwoProperties
        leftLabel="Status"
        leftText={!issue?.status ? "-" : (
          <Status status={issue?.status}/>
        )}
        rightLabel="Deskpro Tickets"
        rightText={<DeskproTickets entityId={issue?.id}/>}
      />
      <TwoProperties
        leftLabel="Created"
        leftText={format(get(issue, ["creationTime", "iso"]))}
        rightLabel="Due Date"
        rightText={format(get(issue, ["dueDate", "iso"]))}
      />
      <Property
        label="Tags"
        text={(!Array.isArray(issue?.tags) || !size(issue?.tags))
          ? <P5>-</P5>
          : <Tags tags={issue?.tags}/>
        }
      />
      <Property
        label="Assignee"
        text={!fullName ? "-" : (
          <Member name={fullName}/>
        )}
      />
      <Property
        label="Attachments"
        text={!size(issue?.attachments) ? "-" : (
          <Stack gap={6} wrap="wrap">
            {map(issue?.attachments, (attach) => (
              <AttachmentTag
                key={get(attach, ["details", "id"])}
                filename={get(attach, ["details", "filename"]) || get(attach, ["details", "name"])}
                fileSize={get(attach, ["details", "sizeBytes"], 0) || 0}
                icon={faFile as AnyIcon}
                href={getAttachmentLink(get(attach, ["details", "id"], "")) as string}
              />
            ))}
          </Stack>
        )}
      />
    </>
  );
};

export { Info };
