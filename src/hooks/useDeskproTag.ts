import { useCallback, useMemo } from "react";
import get from "lodash/get";
import noop from "lodash/noop";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import {
  getTagsService,
  createTagService,
  addIssueTagService,
  removeIssueTagService,
} from "../services/space";
import { findDeskproTag } from "../utils";
import { DESKPRO_TAG } from "../constants";
import type { TicketContext } from "../types";
import type { Issue } from "../services/space/types";

type UseDeskproTag = () => {
  addDeskproTag: (issue: Issue) => Promise<void|{ data: void }>,
  removeDeskproTag: (issue: Issue) => Promise<void|{ data: void }>,
};

const useDeskproTag: UseDeskproTag = () => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };

  const isAddDeskproTag = useMemo(() => {
    return get(context, ["settings", "add_deskpro_tag"]) === true
  }, [context]);

  const addDeskproTag = useCallback((issue: Issue) => {
    const projectId = get(issue, ["projectId"]);

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
      .catch(noop);
  }, [client, isAddDeskproTag]);

  const removeDeskproTag = useCallback((issue: Issue) => {
    const projectId = get(issue, ["projectId"]);

    if (!client || !isAddDeskproTag || !projectId) {
      return Promise.resolve();
    }

    const deskproTag = findDeskproTag(get(issue, ["tags"]));

    return (!deskproTag?.id
        ? Promise.resolve()
        : removeIssueTagService(client, projectId, issue.id, deskproTag.id)
    ).catch(noop);
  }, [client, isAddDeskproTag]);

  return { addDeskproTag, removeDeskproTag };
};

export { useDeskproTag };
