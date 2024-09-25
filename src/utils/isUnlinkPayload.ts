import { has } from "lodash-es";
import type { EventPayload, UnlinkPayload } from "../types";

const isUnlinkPayload = (
  payload: EventPayload,
): payload is UnlinkPayload => {
  return has(payload, ["issue"]);
};

export { isUnlinkPayload };
