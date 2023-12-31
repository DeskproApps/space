import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Info, CustomFieldsView, SubItems, Comments } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Issue, IssueComment } from "../../services/space/types";

type Props = {
  issue?: Maybe<Issue>,
  comments: IssueComment[],
  onNavigateToAddComment: () => void,
};

const ViewIssue: FC<Props> = ({ issue, comments, onNavigateToAddComment }) => (
  <>
    <Container>
      <Info issue={issue}/>
      <CustomFieldsView fields={issue?.customFields}/>
    </Container>

    <HorizontalDivider/>

    <Container>
      <SubItems subItems={issue?.subItemsList} />
    </Container>

    <HorizontalDivider/>

    <Container>
      <Comments comments={comments} onNavigateToAddComment={onNavigateToAddComment} />
    </Container>
  </>
);

export { ViewIssue };
