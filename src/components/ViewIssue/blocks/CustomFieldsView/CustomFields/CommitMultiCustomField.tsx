import get from "lodash/get";
import size from "lodash/size";
import { NoValue } from "./NoValue";
import { CommitCustomField } from "./CommitCustomField";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["VcsCommitListCFValue"];

const CommitMultiCustomField: FC<Props> = ({ commits }) => {
  if (!Array.isArray(commits) || !size(commits)) {
    return (
      <NoValue/>
    );
  }

  return (
    <>
      {commits.map((commit) => (
        <CommitCustomField key={get(commit, ["commit", "commitId"])} commit={commit} />
      ))}
    </>
  );
};

export { CommitMultiCustomField };
