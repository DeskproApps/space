import { Stack } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { NoFound, SubItem } from "../../common";
import type { FC } from "react";
import type { Issue, IssueSubItem } from "../../../services/space/types";

export type Props = {
  subItems?: Issue["subItemsList"],
  onCompleteItem: (
    listId: Issue["subItemsList"]["id"],
    itemId: IssueSubItem["id"],
    resolved: boolean,
  ) => Promise<unknown>,
};

const SubItems: FC<Props> = ({ subItems, onCompleteItem }) => {
  const items = Array.isArray(subItems?.root?.children) ? subItems?.root?.children ?? [] : [];

  return (
    <>
      <Title title={`Sub-items (${items.length})`} />
      <Stack vertical gap={10}>
        {!items.length
          ? <NoFound text="No sub-items found"/>
          : items.map((item: IssueSubItem) => (
            <SubItem
              key={item.id}
              item={item}
              listId={subItems?.id}
              onComplete={onCompleteItem}
            />
          ))
        }
      </Stack>
    </>
  );
};

export { SubItems };
