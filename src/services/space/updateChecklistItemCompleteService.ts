import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Issue, IssueSubItem } from "./types";

const updateChecklistItemCompleteService = (
  client: IDeskproClient,
  listId: Issue["subItemsList"]["id"],
  itemId: IssueSubItem["id"],
  completed: IssueSubItem["simpleDone"],
) => {
  return baseRequest<IssueSubItem>(client, {
    url: `/checklists/id:${listId}/items/id:${itemId}`,
    method: "PATCH",
    data: { itemDone: completed },
  });
};

export { updateChecklistItemCompleteService };
