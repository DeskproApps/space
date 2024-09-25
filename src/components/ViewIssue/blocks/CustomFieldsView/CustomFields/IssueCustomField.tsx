import { isEmpty } from "lodash-es";
import { P5, Stack, IconV2 } from "@deskpro/deskpro-ui";
import { Link } from "@deskpro/app-sdk";
import { useExternalLinks } from "../../../../../hooks";
import { getIssueKey } from "../../../../../utils";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { Maybe } from "../../../../../types";
import type { components } from "../../../../../services/space/schema";
import type { Issue } from "../../../../../services/space/types";

type Props = Omit<components["schemas"]["IssueCFValue"], "issue"> & { issue: Maybe<Issue> };

const  IssueCustomField: FC<Props> = ({ issue }) => {
  const { getIssueLink } = useExternalLinks();

  if (!issue) {
    return (
      <NoValue/>
    );
  }

  const link = getIssueLink(issue);
  const title = issue?.title;
  const key = getIssueKey(issue);
  const result = [];

  key && result.push(key);
  key && result.push("|");
  title && result.push(title);

  if (isEmpty(result)) {
    return (
      <NoValue/>
    );
  }

  return (
    <Stack gap={6} align="center">
      <IconV2 icon="dazzle-linear-live"/>
      <P5>{result.join(" ")}</P5>
      {link && (
        <Link target="_blank" href={link} color="grey40" style={{ display: "flex" }}>
          <IconV2 icon="heroicons-linear-external-link"/>
        </Link>
      )}
    </Stack>
  );
};

export { IssueCustomField };
