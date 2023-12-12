import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Info, SubItems, Comments } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Issue, IssueComment } from "../../services/space/types";

type Props = {
  issue?: Maybe<Issue>,
  comments: IssueComment[],
};

const ViewIssue: FC<Props> = ({ issue, comments }) => {
  return (
    <>
      <Container>
        <Info issue={issue}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <SubItems subItems={issue?.subItemsList} />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Comments comments={comments} />
      </Container>
    </>
  );
};

export { ViewIssue };
