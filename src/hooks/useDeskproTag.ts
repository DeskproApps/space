import { useCallback } from "react";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import {
  getTagsService,
  createTagService,
  addIssueTagService,
  removeIssueTagService,
} from "../services/space";
import { findDeskproTag } from "../utils";
import { DESKPRO_TAG } from "../constants";
import type { Issue } from "../services/space/types";

type UseDeskproTag = () => {
  addDeskproTag: (issue: Issue) => Promise<void|{ data: void }>,
  removeDeskproTag: (issue: Issue) => Promise<void|{ data: void }>,
};

const useDeskproTag: UseDeskproTag = () => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext();
  const isAddDeskproTag = context?.settings?.add_deskpro_tag === true;

  const addDeskproTag = useCallback((issue: Issue) => {
    const projectId = issue.projectId;

    if (!client || !isAddDeskproTag || !projectId) {
      return Promise.resolve();
    }

    return getTagsService(client, projectId)
      .then(({ data: tags }) => {
        const deskproTag = findDeskproTag(tags);

        return deskproTag
          ? Promise.resolve(deskproTag)
          : createTagService(client, projectId, DESKPRO_TAG.name);
      })
      .then((dpTag) => addIssueTagService(client, projectId, issue.id, dpTag.id))
      .catch(() => {});
  }, [client, isAddDeskproTag]);

  const removeDeskproTag = useCallback((issue: Issue) => {
    const projectId = issue.projectId;

    if (!client || !isAddDeskproTag || !projectId) {
      return Promise.resolve();
    }

    const deskproTag = findDeskproTag(issue.tags);

    return (!deskproTag?.id
        ? Promise.resolve()
        : removeIssueTagService(client, projectId, issue.id, deskproTag.id)
    ).catch(() => {});
  }, [client, isAddDeskproTag]);

  return { addDeskproTag, removeDeskproTag };
};

export { useDeskproTag };
