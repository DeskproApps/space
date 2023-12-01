import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { wrap, mockIssues, mockSearchIssues, mockProjects } from "../../../../testing";
import {
  getIssuesService,
  getProjectsService,
  searchIssuesService,
} from "../../../services/space";
import { useSearch } from "../hooks";
import type { Result } from "../hooks";

jest.mock("../../../services/space/getIssuesService");
jest.mock("../../../services/space/getProjectsService");
jest.mock("../../../services/space/searchIssuesService");

const renderSearchHook = (project: string, q: string) => renderHook<Result, unknown>(
  () => useSearch(project, q),
  { wrapper: ({ children }) => wrap(children, { query: true, appSdk: true }) },
);

describe("LinkIssuesPage", () => {
  describe("useSearch", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("should return the issues we have search", async () => {
      (getProjectsService as jest.Mock).mockResolvedValueOnce(mockProjects);
      (searchIssuesService as jest.Mock).mockResolvedValueOnce(mockSearchIssues);
      (getIssuesService as jest.Mock).mockResolvedValueOnce(mockIssues);

      const { result } = renderSearchHook("project-001", "builder");

      await waitFor(() => {
        expect(result.current.projects).toStrictEqual(mockProjects.data);
        expect(result.current.issues).toStrictEqual(mockIssues);
      });
    });

    test("shouldn't return the issues if no selected project", async () => {
      (getProjectsService as jest.Mock).mockResolvedValueOnce(mockProjects);
      (searchIssuesService as jest.Mock).mockResolvedValueOnce(mockSearchIssues);
      (getIssuesService as jest.Mock).mockResolvedValueOnce(mockIssues);

      const { result } = renderSearchHook(null as never, "builder");

      await waitFor(() => {
        expect(result.current.issues).toStrictEqual([]);
      });
    });

    test("shouldn't return the issues if no passing search query", async () => {
      (getProjectsService as jest.Mock).mockResolvedValueOnce(mockProjects);
      (searchIssuesService as jest.Mock).mockResolvedValueOnce(mockSearchIssues);
      (getIssuesService as jest.Mock).mockResolvedValueOnce(mockIssues);

      const { result } = renderSearchHook("project-001", "");

      await waitFor(() => {
        expect(result.current.issues).toStrictEqual([]);
      });
    });
  });
});
