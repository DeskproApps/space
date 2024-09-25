import { Fragment } from "react";
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
      title={`Comments (${comments.length || 0})`}
      onClick={onNavigateToAddComment}
    />

    {comments.map((comment) => (
      <Fragment key={comment.id}>
        <Comment
          name={getFullName(comment.author?.details?.user)}
          text={comment.text}
          {...(comment.created?.iso ? { date: new Date(comment.created?.iso) } : {})}
        />
        <HorizontalDivider style={{ marginBottom: 10 }} />
      </Fragment>
    ))}
  </>
);

export { Comments };
