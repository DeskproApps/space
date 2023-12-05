import size from "lodash/size";
import { NoFound } from "./NoFound";
import type { FC, ReactNode } from "react";
import type { Issue } from "../../../services/space/types";

export type Props = {
  issues: Issue[],
  children?: (issues: Issue[]) => ReactNode,
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
