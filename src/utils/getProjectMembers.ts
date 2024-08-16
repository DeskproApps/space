import type { Maybe } from "../types";
import type { Project, Member } from "../services/space/types";

const getProjectMembers = (project?: Maybe<Project>): Member[] => {
  const members = [
    ...(Array.isArray(project?.memberProfiles) ? project?.memberProfiles ?? [] : []),
    ...(Array.isArray(project?.adminProfiles) ? project?.adminProfiles ?? [] : []),
  ].filter(Boolean);

  if (!members.length) {
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
