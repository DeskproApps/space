import size from "lodash/size";
import { NoValue } from "./NoValue";
import { IssueCustomField } from "./IssueCustomField";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";
import type { Issue } from "../../../../../services/space/types";
import type { Maybe } from "../../../../../types";

type Props = Omit<components["schemas"]["IssueListCFValue"], "issues"> & { issues: Maybe<Issue[]> };

const IssueMultiCustomField: FC<Props> = ({ issues }) => {
  if (!Array.isArray(issues) || !size(issues)) {
    return (
      <NoValue/>
    );
  }

  return (
    <>
      {issues.map((issue) => (
        <IssueCustomField key={issue.id} issue={issue} />
      ))}
    </>
  );
};

export { IssueMultiCustomField };
