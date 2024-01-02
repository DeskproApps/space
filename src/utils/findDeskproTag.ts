import find from "lodash/find";
import toLower from "lodash/toLower";
import { DESKPRO_TAG } from "../constants";
import type { IssueTag } from "../services/space/types";

const findDeskproTag = (tags: IssueTag[]): IssueTag|void => {
  if (!Array.isArray(tags)) {
    return;
  }

  return find(tags, ({ name }) => toLower(name) === toLower(DESKPRO_TAG.name));
};

export { findDeskproTag };
