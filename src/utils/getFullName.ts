import get from "lodash/get";
import size from "lodash/size";
import type { Maybe } from "../types";
import type { Member } from "../services/space/types";

const getFullName = (member?: Maybe<Member>): string => {
  const name = [
    get(member, ["name", "firstName"]),
    get(member, ["name", "lastName"]),
  ].filter(Boolean);

  return size(name) ? name.join(" ") : get(member, ["username"]) || "";
};

export { getFullName };
