import { cleanup, renderHook } from "@testing-library/react";
import { useExternalLinks } from "../useExternalLinks";
import { getProjectsService } from "../../services/space";
import { wrap, mockProjects, mockIssues } from "../../../testing";
import type { Result } from "../useExternalLinks";

jest.mock("../../services/space/getProjectsService");

const renderExternalLinksHook = () => renderHook<Result, unknown>(
  () => useExternalLinks(),
  { wrapper: ({ children }) => wrap(children, { query: true, appSdk: true }) },
);

describe("useExternalLinks", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should return project link", () => {
    (getProjectsService as jest.Mock).mockResolvedValueOnce(mockProjects);
    const { result } = renderExternalLinksHook();
    const link = result.current.getProjectLink(mockProjects.data[0] as never);

    expect(link).toBe("https://space.test/p/main");
  });

  test("should return issue link", () => {
    (getProjectsService as jest.Mock).mockResolvedValueOnce(mockProjects);
    const { result } = renderExternalLinksHook();
    const link = result.current.getIssueLink(mockIssues[0] as never);

    expect(link).toBe("https://space.test/p/main/issues/8");
  });
});
