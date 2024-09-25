import { cleanup } from "@testing-library/react";
import { render, mockIssues } from "../../../../../testing";
import { SubItems } from "../SubItems";
import type { Props } from "../SubItems";

const renderSubItems = (props?: Partial<Props>) => render((
  <SubItems
    subItems={props?.subItems || mockIssues[1].subItemsList as never}
    onCompleteItem={props?.onCompleteItem || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("ViewIssue", () => {
  describe("SubItems", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderSubItems();

      expect(await findByText(/Sub-items \(4\)/i)).toBeInTheDocument();
      expect(await findByText(/page configurator/i)).toBeInTheDocument();
      expect(await findByText(/blocks configurator/i)).toBeInTheDocument();
      expect(await findByText(/blockset configurator/i)).toBeInTheDocument();
      expect(await findByText(/wrapper for filling the store/i)).toBeInTheDocument();
    });

    test("should empty", async () => {
      const { findByText } = renderSubItems({ subItems: [] as never });
      expect(await findByText(/No sub-items found/i)).toBeInTheDocument();
    });
  });
});
