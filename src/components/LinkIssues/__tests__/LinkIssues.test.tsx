import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockProjects, mockIssues } from "../../../../testing";
import { LinkIssues } from "../LinkIssues";
import type { Props } from "../LinkIssues";

const renderLinkIssues = (props?: Partial<Props>) => render((
  <LinkIssues
    isLoading={props?.isLoading || false}
    isSubmitting={props?.isSubmitting || false}
    projects={props?.projects || mockProjects.data as never[]}
    issues={props?.issues || mockIssues as never[]}
    selectedIssues={props?.selectedIssues || []}
    onCancel={props?.onCancel || jest.fn()}
    onLinkIssues={props?.onLinkIssues || jest.fn()}
    onChangeProject={props?.onChangeProject || jest.fn()}
    onChangeSearchQuery={props?.onChangeSearchQuery || jest.fn()}
    onChangeSelectedIssue={props?.onChangeSelectedIssue || jest.fn()}
    onNavigateToCreate={props?.onNavigateToCreate || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkIssues", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should navigate to \"create issue\" page", async () => {
    const mockOnNavigateToCreate = jest.fn();
    const { findByRole } = renderLinkIssues({ onNavigateToCreate: mockOnNavigateToCreate });

    const createButton = await findByRole("button", { name: "Create Issue" });
    await userEvent.click(createButton);

    expect(mockOnNavigateToCreate).toHaveBeenCalled();
  });
});
