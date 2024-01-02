import { Fragment } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { getFullName } from "../../../utils";
import { Comment } from "../../common";
import type { FC } from "react";
import type { IssueComment } from "../../../services/space/types";

export type Props = {
  comments: IssueComment[],
  onNavigateToAddComment: () => void,
};

const Comments: FC<Props> = ({ comments, onNavigateToAddComment }) => (
  <>
    <Title
      title={`Comments (${size(comments)})`}
      onClick={onNavigateToAddComment}
    />

    {comments.map((comment) => (
      <Fragment key={comment.id}>
        <Comment
          name={getFullName(get(comment, ["author", "details", "user"]))}
          text={get(comment, ["text"])}
          date={new Date(get(comment, ["created", "iso"]))}
        />
        <HorizontalDivider style={{ marginBottom: 10 }} />
      </Fragment>
    ))}
  </>
);

export { Comments };
