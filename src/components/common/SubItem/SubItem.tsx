import { useState, useCallback } from "react";
import { P5, Spinner, Checkbox } from "@deskpro/deskpro-ui";
import { isIssue } from "../../../utils";
import { Card } from "../Card";
import type { FC } from "react";
import type { IssueSubItem } from "../../../services/space/types";

type Props = {
  item: IssueSubItem,
  onComplete?: () => Promise<void>,
};

const SubItem: FC<Props> = ({ item, onComplete }) => {
  const boxSize = 14;
  const [isLoading, setIsLoading] = useState(false);
  const itemName = isIssue(item?.issue)
    ? item.issue.title
    : item.simpleText;
  const itemIsDone = isIssue(item?.issue)
    ? Boolean(item.issue.status.resolved)
    : Boolean(item.simpleDone);

  const onChange = useCallback(() => {
    setIsLoading(true);
    onComplete && onComplete().finally(() => setIsLoading(false));
  }, [onComplete]);

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
            <Checkbox disabled size={boxSize} checked={itemIsDone} onChange={onChange}/>
          )
        }
      </Card.Media>
      <Card.Body size={boxSize}><P5>{itemName}</P5></Card.Body>
    </Card>
  );
};

export { SubItem };
