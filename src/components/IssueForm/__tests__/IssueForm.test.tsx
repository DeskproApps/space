import { cleanup } from "@testing-library/react";
import { render, mockProjects } from "../../../../testing";
import {
  getProjectsService,

} from "../../../services/space";
import { IssueForm } from "../IssueForm";
import type { Props } from "../types";

jest.mock("../../../services/space/getProjectsService");

const renderIssueForm = (props?: Partial<Props>) => render((
  <IssueForm
    onSubmit={props?.onSubmit || jest.fn()}
    onCancel={props?.onCancel || jest.fn()}
    isEditMode={props?.isEditMode || false}
    error={props?.error || null}
  />
), { wrappers: { appSdk: true, query: true } });

describe("IssueForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    (getProjectsService as jest.Mock).mockResolvedValue(mockProjects);
  });

  test("render", async () => {
    const { findByText } = renderIssueForm();

    expect(await findByText(/Project/i)).toBeInTheDocument();
    expect(await findByText(/Title/i)).toBeInTheDocument();
    expect(await findByText(/Description/i)).toBeInTheDocument();
    expect(await findByText(/Assignee/i)).toBeInTheDocument();
    expect(await findByText(/Status/i)).toBeInTheDocument();
    expect(await findByText(/Due Date/i)).toBeInTheDocument();
    expect(await findByText(/Tags/i)).toBeInTheDocument();
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
