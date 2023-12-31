import get from "lodash/get";
import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { NoFound, SubItem } from "../../common";
import type { FC } from "react";
import type { Issue, IssueSubItem } from "../../../services/space/types";

export type Props = {
  subItems?: Issue["subItemsList"],
};

const SubItems: FC<Props> = ({ subItems }) => {
  const items = get(subItems, ["root", "children"], []) || [];

  return (
    <>
      <Title title={`Sub-items (${size(items)})`} />
      <Stack vertical gap={10}>
        {(!Array.isArray(items) || !size(items))
          ? <NoFound text="No sub-items found"/>
          : items.map((item: IssueSubItem) => (
            <SubItem key={item.id} item={item} />
          ))
        }
      </Stack>
    </>
  );
};

export { SubItems };
