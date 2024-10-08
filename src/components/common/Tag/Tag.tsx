import { size } from "lodash-es";
import { P5, Tag as TagUI, lightTheme, Stack } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { IssueTag } from "../../../services/space/types";

type Props = {
  tag: IssueTag,
}

const Tag: FC<Props> = ({ tag }) => (
  <TagUI
    color={{
      borderColor: lightTheme.colors.grey80,
      backgroundColor: `${lightTheme.colors.grey80}33`,
      textColor: lightTheme.colors.grey80,
    }}
    label={tag.name}
    withClose={false}
  />
);

const Tags: FC<{ tags?: Maybe<IssueTag[]> }> = ({ tags }) => {
  if (!Array.isArray(tags) || !size(tags)) {
    return <P5>-</P5>;
  }

  return (
    <Stack gap={6} wrap="wrap">
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag}/>
      ))}
    </Stack>
  );
};

export { Tag, Tags };
