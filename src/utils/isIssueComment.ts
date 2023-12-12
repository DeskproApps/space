import get from "lodash/get";
import { components } from "../services/space/schema";

const isIssueComment = (message: components["schemas"]["ChannelItemRecord"]): boolean => {
  return get(message, ["details", "className"]) === "M2TextItemContent";
};

export { isIssueComment };
