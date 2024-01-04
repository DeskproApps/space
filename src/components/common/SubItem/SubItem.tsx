import { useState, useCallback } from "react";
import { P5, Spinner, Checkbox } from "@deskpro/deskpro-ui";
import { isIssue } from "../../../utils";
import { Card } from "../Card";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Issue, IssueSubItem } from "../../../services/space/types";

export type Props = {
  item: IssueSubItem,
  listId?: Issue["subItemsList"]["id"],
  onComplete?: (
    listId: Issue["subItemsList"]["id"],
    itemId: IssueSubItem["id"],
    resolved: boolean,
  ) => Promise<unknown>,
};

const SubItem: FC<Props> = ({ item, listId, onComplete }) => {
  const boxSize = 14;
  const [isLoading, setIsLoading] = useState(false);
  const itemName = isIssue(item?.issue as Maybe<Issue>)
    ? item.issue?.title
    : item.simpleText;
  const itemIsDone = isIssue(item?.issue as Maybe<Issue>)
    ? Boolean(item.issue?.status.resolved)
    : Boolean(item.simpleDone);

  const onChange = useCallback(() => {
    if (onComplete && listId && item.id) {
      setIsLoading(true);
      onComplete && onComplete(listId, item.id, !itemIsDone).finally(() => setIsLoading(false));
    }
  }, [onComplete, listId, item, itemIsDone]);

  return (
    <Card style={{ marginBottom: 7 }}>
      <Card.Media>
        {isLoading
          ? (
            <div style={{ width: `${boxSize}px`, height: `${boxSize}px` }}>
              <Spinner size="extra-small"/>
            </div>
          )
          : (
            <Checkbox
              size={boxSize}
              checked={itemIsDone}
              onChange={onChange}
              disabled={!onComplete}
            />
          )
        }
      </Card.Media>
      <Card.Body size={boxSize}><P5>{itemName}</P5></Card.Body>
    </Card>
  );
};

export { SubItem };
