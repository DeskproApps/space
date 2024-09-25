import { NoValue } from "./NoValue";
import { CommitCustomField } from "./CommitCustomField";
import type { FC } from "react";
import type { CFCommits } from "../../../../../services/space/types";

type Props = CFCommits;

const CommitMultiCustomField: FC<Props> = ({ commits }) => {
  if (!commits?.length) {
    return (
      <NoValue/>
    );
  }

  return (
    <>
      {commits.map((commit) => (
        <CommitCustomField key={commit?.commit?.commitId} commit={commit} />
      ))}
    </>
  );
};

export { CommitMultiCustomField };
