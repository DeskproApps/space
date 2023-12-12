import get from "lodash/get";
import size from "lodash/size";
import type { Maybe } from "../types";
import type { Project, Member } from "../services/space/types";

const getProjectMembers = (project?: Maybe<Project>): Member[] => {
  const members = [
    ...get(project, ["memberProfiles"], []) || [],
    ...get(project, ["adminProfiles"], []) || [],
  ].filter(Boolean);

  if (!size(members)) {
    return [];
  }

  return members.reduce<Member[]>((acc, member) => {
    if (!acc.some(({ id }) => id === member.id)) {
      acc.push(member);
    }

    return acc;
  }, []);
};

export { getProjectMembers };
