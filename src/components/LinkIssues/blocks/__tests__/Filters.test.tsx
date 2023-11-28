import { cleanup } from "@testing-library/react";
import { Filters } from "../Filters";
import { render, mockProjects } from "../../../../../testing";
import type { Props } from "../Filters";

const renderFilters = (props?: Partial<Props>) => render((
  <Filters
    isLoading={props?.isLoading || false}
    projects={props?.projects || mockProjects.data as never}
    onChangeSearchQuery={props?.onChangeSearchQuery || jest.fn()}
    onChangeProject={props?.onChangeProject || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkIssues", () => {
  describe("Issues", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText, findByPlaceholderText } = renderFilters();
      expect(await findByPlaceholderText(/Search/i)).toBeInTheDocument();
      expect(await findByText(/Project/i)).toBeInTheDocument();
    });
  });
});
