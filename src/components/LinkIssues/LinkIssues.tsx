import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Filters, Buttons, Issues } from "./blocks";
import type { FC } from "react";
import type { IssueType } from "../../types";
import type { Project } from "../../services/space/types";

export type Props = {
  isLoading: boolean,
  isSubmitting: boolean,
  issues: IssueType[],
  projects: Project[],
  onCancel: () => void,
  onLinkIssues: () => void,
  selectedIssues: IssueType[],
  onChangeSearchQuery: (search: string) => void,
  onChangeProject: (projectId: Project["id"]) => void,
  onChangeSelectedIssue: (issue: IssueType) => void,
};

const LinkIssues: FC<Props> = ({
  projects,
  isLoading,
  onChangeProject,
  onChangeSearchQuery,
  onCancel,
  issues,
  isSubmitting,
  onLinkIssues,
  selectedIssues,
  onChangeSelectedIssue,
}) => {
  return (
    <>
      <Container>
        <Filters
          isLoading={isLoading}
          projects={projects}
          onChangeProject={onChangeProject}
          onChangeSearchQuery={onChangeSearchQuery}
        />
        <Buttons
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          onLinkIssues={onLinkIssues}
          selectedIssues={selectedIssues}
        />
      </Container>
      <HorizontalDivider/>
      <Container>
        <Issues
          issues={issues}
          isLoading={isLoading}
          selectedIssues={selectedIssues}
          onChangeSelectedIssue={onChangeSelectedIssue}
        />
      </Container>
    </>
  );
};

export { LinkIssues };
