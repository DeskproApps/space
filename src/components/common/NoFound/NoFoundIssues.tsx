import size from "lodash/size";
import { NoFound } from "./NoFound";
import type { FC, ReactNode } from "react";
import type { IssueType } from "../../../types";

export type Props = {
  issues: IssueType[],
  children?: (issues: IssueType[]) => ReactNode,
}

const NoFoundIssues: FC<Props> = ({ children, issues }) => (
  <>
    {!Array.isArray(issues)
      ? <NoFound/>
      : !size(issues)
      ? <NoFound text="No Space issues found"/>
      : children && children(issues)
    }
  </>
);

export { NoFoundIssues };
