import { Container } from "../common";
import { IssueCommentForm } from "../IssueCommentForm";
import type { FC } from "react";
import type { Props as CommentFormProps } from "../IssueCommentForm";

type Props = CommentFormProps & {
  //..
};

const CreateIssueComment: FC<Props> = ({ error, onSubmit, onCancel }) => {
  return (
    <Container>
      <IssueCommentForm
        error={error}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Container>
  );
};

export { CreateIssueComment };
