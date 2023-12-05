import { cleanup } from "@testing-library/react";
import { render, mockIssues } from "../../../../../testing";
import { Issues } from "../Issues";
import type { Props } from "../Issues";

const renderIssues = (props?: Partial<Props>) => render((
  <Issues
    issues={props?.issues || mockIssues as never[]}
    isLoading={props?.isLoading || false}
    selectedIssues={props?.selectedIssues || []}
    onChangeSelectedIssue={props?.onChangeSelectedIssue || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkIssues", () => {
  describe("Issues", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderIssues();
      expect(await findByText(/AppBuilder/i)).toBeInTheDocument();
      expect(await findByText(/PageBuilder/i)).toBeInTheDocument();
    });
  });
});
