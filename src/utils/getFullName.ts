import type { Maybe } from "../types";
import type { Member } from "../services/space/types";

const getFullName = (member?: Maybe<Member>): string => {
  const name = [
    member?.name?.firstName,
    member?.name?.lastName,
  ].filter(Boolean);

  return name.length ? name.join(" ") : member?.username || "";
};

export { getFullName };
