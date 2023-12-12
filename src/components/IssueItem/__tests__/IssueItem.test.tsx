import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { IssueItem } from "../IssueItem";
import { mockIssues } from "../../../../testing";
import type { Props } from "../IssueItem";

const renderIssueItem = (props?: Partial<Props>) => render((
  <IssueItem
    issue={props?.issue as never}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("IssueItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText, container } = renderIssueItem({ issue: mockIssues[1] as never });

    expect(await findByText(/PageBuilder/i)).toBeInTheDocument();
    expect(container.querySelector('a[href="https://space.test/p/main/issues/7"]')).toBeInTheDocument();
    expect(await findByText(/Deskpro Apps/i)).toBeInTheDocument();
    expect(container.querySelector('a[href="https://space.test/p/main"]')).toBeInTheDocument();
    expect(await findByText(/MAIN-T-7/i)).toBeInTheDocument();
    expect(await findByText(/In Progress/i)).toBeInTheDocument();
    expect(await findByText(/20 Nov, 2023/i)).toBeInTheDocument();
    expect(await findByText(/31 Dec, 2023/i)).toBeInTheDocument();
    expect(await findByText(/ilia makarov/i)).toBeInTheDocument();
  });
});
