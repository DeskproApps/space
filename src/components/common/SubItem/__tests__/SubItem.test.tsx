import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockIssues } from "../../../../../testing";
import { SubItem } from "../SubItem";
import type { Props } from "../SubItem";

const mockItemAsIssue = mockIssues[1].subItemsList.root.children[0];
const mockItem = mockIssues[1].subItemsList.root.children[1];
const mockCompletedItem = mockIssues[1].subItemsList.root.children[1];
const mockUnCompletedItem = mockIssues[1].subItemsList.root.children[2];

const renderSubItem = (props?: Partial<Props>) => render((
  <SubItem
    item={props?.item || mockItem as never}
    listId={props?.listId}
    onComplete={props?.onComplete ?? jest.fn()}
  />
), { wrappers: { theme: true } });

describe("SubItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSubItem();
    expect(await findByText(/blocks configurator/i)).toBeInTheDocument();
  });

  test("render item as issue", async () => {
    const { findByText } = renderSubItem({ item: mockItemAsIssue as never });
    expect(await findByText(/page configurator/i)).toBeInTheDocument();
  });

  test("render completed item", async () => {
    const { container } = renderSubItem({ item: mockCompletedItem as never });
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test("render uncompleted item", async () => {
    const { container } = renderSubItem({ item: mockUnCompletedItem as never });
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test("should handle click", async () => {
    const mockOnComplete = jest.fn(() => Promise.resolve());
    const { container } = renderSubItem({
      listId: "list-id-001",
      onComplete: mockOnComplete,
    });
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;

    await userEvent.click(checkbox);

    expect(mockOnComplete).toHaveBeenCalledWith("list-id-001", "2IGjGW1YgECL", false);
  });


  test("shouldn't handle click if no pass listId", async () => {
    const mockOnComplete = jest.fn(() => Promise.resolve());
    const { container } = renderSubItem({ onComplete: mockOnComplete });
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;

    await userEvent.click(checkbox);

    expect(mockOnComplete).not.toHaveBeenCalled();
  });
});
