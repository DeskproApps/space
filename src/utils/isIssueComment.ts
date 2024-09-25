import { components } from "../services/space/schema";

const isIssueComment = (message: components["schemas"]["ChannelItemRecord"]): boolean => {
  return message.details?.className === "M2TextItemContent" as unknown as string;
};

export { isIssueComment };
