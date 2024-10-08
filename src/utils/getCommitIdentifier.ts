import { split, isEmpty, isString } from "lodash-es";
import type { Maybe } from "../types";

type CommitIdentifier = {
  className: "CFCommitIdentifier.Full",
  project: string,
  repository: string,
  commitHash: string,
};

const getCommitIdentifier = (value?: string): Maybe<CommitIdentifier> => {
  if (!isString(value) || isEmpty(value)) {
    return null;
  }

  const [project, repo, hash] = split(value, "/");

  if (!project || !repo || !hash) {
    return null;
  }

  return {
    className: "CFCommitIdentifier.Full",
    project,
    repository: repo,
    commitHash: hash,
  };
};

export { getCommitIdentifier };
