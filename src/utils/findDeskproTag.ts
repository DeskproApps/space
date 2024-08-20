import { DESKPRO_TAG } from "../constants";
import type { IssueTag } from "../services/space/types";

const findDeskproTag = (tags?: IssueTag[]): IssueTag|void => {
  return (Array.isArray(tags) ? tags : []).find(({ name }) => {
    return `${name}`.toLowerCase() === DESKPRO_TAG.name.toLowerCase();
  });
};

export { findDeskproTag };
