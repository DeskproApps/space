import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Info, CustomFieldsView, SubItems, Comments } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type {
  Issue,
  IssueComment,
  IssueSubItem,
  FieldVisibility,
} from "../../services/space/types";

type Props = {
  issue?: Maybe<Issue>,
  comments: IssueComment[],
  onCompleteItem: (
    listId: Issue["subItemsList"]["id"],
    itemId: IssueSubItem["id"],
    resolved: boolean,
  ) => Promise<unknown>,
  onNavigateToAddComment: () => void,
  visibility: Record<FieldVisibility["field"], FieldVisibility["visible"]>,
};

const ViewIssue: FC<Props> = ({
  issue,
  comments,
  visibility,
  onCompleteItem,
  onNavigateToAddComment,
}) => (
  <>
    <Container>
      <Info issue={issue} visibility={visibility}/>
      <CustomFieldsView fields={issue?.customFields}/>
    </Container>

    <HorizontalDivider/>

    <Container>
      <SubItems
        subItems={issue?.subItemsList}
        onCompleteItem={onCompleteItem}
      />
    </Container>

    <HorizontalDivider/>

    <Container>
      <Comments comments={comments} onNavigateToAddComment={onNavigateToAddComment} />
    </Container>
  </>
);

export { ViewIssue };
