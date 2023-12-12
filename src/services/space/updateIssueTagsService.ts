import size from "lodash/size";
import { addIssueTagService } from "./addIssueTagService";
import { removeIssueTagService } from "./removeIssueTagService";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, Issue, IssueTag } from "./types";

const updateIssueTagsService = (
  client: IDeskproClient,
  projectId: Project["id"],
  issueId: Issue["id"],
  { add, rem }: { add: Array<IssueTag["id"]>, rem: Array<IssueTag["id"]> }
) => {
  return [
    ...(!size(add) ? [Promise.resolve()] : add.map(
      (tagId) => addIssueTagService(client, projectId, issueId, tagId),
    )),
    ...(!size(rem) ? [Promise.resolve()] : rem.map(
      (tagId) => removeIssueTagService(client, projectId, issueId, tagId),
    ))
  ];
};

export { updateIssueTagsService };
