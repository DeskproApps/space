import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Filters, Buttons, Issues } from "./blocks";
import type { FC } from "react";
import type { Issue, Project } from "../../services/space/types";

export type Props = {
  isLoading: boolean,
  isSubmitting: boolean,
  issues: Issue[],
  projects: Project[],
  onCancel: () => void,
  onLinkIssues: () => void,
  selectedIssues: Issue[],
  onChangeSearchQuery: (search: string) => void,
  onChangeProject: (projectId: Project["id"]) => void,
  onChangeSelectedIssue: (issue: Issue) => void,
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
