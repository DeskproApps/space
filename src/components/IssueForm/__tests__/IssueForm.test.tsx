import { cleanup, waitFor } from "@testing-library/react";
import {
  render,
  mockTags,
  mockIssues,
  mockProjects,
  mockIssueStatuses,
  mockFieldsVisibility,
} from "../../../../testing";
import {
  getTagsService,
  getProjectsService,
  getIssueStatusesService,
  getFieldsVisibilityService,
  getCustomFieldsConfigService,
} from "../../../services/space";
import { IssueForm } from "../IssueForm";
import type { Props } from "../types";

jest.mock("../../../services/space/getProjectsService");
jest.mock("../../../services/space/getFieldsVisibilityService");
jest.mock("../../../services/space/getTagsService");
jest.mock("../../../services/space/getIssueStatusesService");
jest.mock("../../../services/space/getCustomFieldsConfigService");

const renderIssueForm = (props?: Partial<Props>) => render((
  <IssueForm
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    isEditMode={props?.isEditMode || false}
    error={props?.error || null}
    issue={props?.issue}
  />
), { wrappers: { appSdk: true, query: true } });

describe("IssueForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    (getProjectsService as jest.Mock).mockResolvedValue(mockProjects);
    (getFieldsVisibilityService as jest.Mock).mockResolvedValue(mockFieldsVisibility);
    (getTagsService as jest.Mock).mockResolvedValue(mockTags);
    (getIssueStatusesService as jest.Mock).mockResolvedValue(mockIssueStatuses);
    (getCustomFieldsConfigService as jest.Mock).mockResolvedValue([]);
  });

  test("render creation form", async () => {
    const { findByText } = renderIssueForm();

    expect(await findByText(/Project/i)).toBeInTheDocument();
    expect(await findByText(/Title/i)).toBeInTheDocument();
    expect(await findByText(/Description/i)).toBeInTheDocument();
    expect(await findByText(/Status/i)).toBeInTheDocument();
  });

  test("render edit form", async () => {
    const { findByText } = renderIssueForm({ issue: mockIssues[1] as never });

    await waitFor(async () => {
      expect(await findByText(/Project/i)).toBeInTheDocument();
      expect(await findByText(/Title/i)).toBeInTheDocument();
      expect(await findByText(/Description/i)).toBeInTheDocument();
      expect(await findByText(/Assignee/i)).toBeInTheDocument();
      expect(await findByText(/Status/i)).toBeInTheDocument();
      expect(await findByText(/Due Date/i)).toBeInTheDocument();
      expect(await findByText(/Tags/i)).toBeInTheDocument();
    });
  });

  test("should show \"Create\" button", async () => {
    const { findByRole } = renderIssueForm();
    const createButton = await findByRole("button", { name: "Create" });
    expect(createButton).toBeInTheDocument();
  });

  test("should show \"Save\" button", async () => {
    const { findByRole } = renderIssueForm({ isEditMode: true });
    const saveButton = await findByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();
  });

  test("render error", async () => {
    const { findByText } = renderIssueForm({ error: "some error" });
    expect(await findByText(/some error/)).toBeInTheDocument();
  });
});
