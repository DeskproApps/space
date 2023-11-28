import { Pill } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { IssueStatus } from "../../../services/space/types";

const Status: FC<{ status?: IssueStatus }> = ({ status }) => {
  if (!status) {
    return null;
  }

  return (
    <Pill
      backgroundColor={`#${status.color}`}
      textColor="#fff"
      label={status.name}
    />
  )
};

export { Status };
