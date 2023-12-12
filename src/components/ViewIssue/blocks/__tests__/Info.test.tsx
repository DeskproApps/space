import { cleanup } from "@testing-library/react";
import { render, mockIssues } from "../../../../../testing";
import { Info } from "../Info";
import type { Props } from "../Info";

const renderInfo = (props?: Partial<Props>) => render((
  <Info issue={props?.issue || mockIssues[1] as never} />
), { wrappers: { theme: true } });

describe("ViewIssue", () => {
  describe("Info", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText, findAllByText } = renderInfo();

      expect(await findAllByText(/PageBuilder/i)).toHaveLength(2);
      expect(await findByText(/Deskpro Apps/i)).toBeInTheDocument();
      expect(await findByText(/MAIN-T-7/i)).toBeInTheDocument();
      expect(await findByText(/MAIN-T-8/i)).toBeInTheDocument();
      expect(await findByText(/In Progress/i)).toBeInTheDocument();
      expect(await findByText(/20 Nov, 2023/i)).toBeInTheDocument();
      expect(await findByText(/31 Dec, 2023/i)).toBeInTheDocument();
      expect(await findByText(/ilia makarov/i)).toBeInTheDocument();
    });
  });
});
