import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { getEntityListService } from "../../services/deskpro";
import { getIssuesService } from "../../services/space";
import { useLinkedIssues } from "../useLinkedIssues";
import { wrap, mockIssues } from "../../../testing";
import type { ReactElement } from "react";
import type { Result } from "../useLinkedIssues";

jest.mock("../../services/deskpro/getEntityListService");
jest.mock("../../services/space/getIssuesService");

const renderLinkedIssuesHook = () => renderHook<Result, unknown>(
  () => useLinkedIssues(),
  { wrapper: ({ children }) => wrap(children as ReactElement, { query: true, appSdk: true }) },
);

describe("useLinkedIssues", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should return linked issues", async () => {
    (getEntityListService as jest.Mock).mockResolvedValueOnce(["123", "456"]);
    (getIssuesService as jest.Mock).mockResolvedValueOnce(mockIssues);

    const { result } = renderLinkedIssuesHook();

    await waitFor(() => {
      expect(result.current.issues).toEqual(mockIssues);
    });
  });

  test("shouldn't return issues if no linked", async () => {
    (getEntityListService as jest.Mock).mockResolvedValueOnce([]);
    (getIssuesService as jest.Mock).mockResolvedValueOnce(mockIssues);

    const { result } = renderLinkedIssuesHook();

    await waitFor(() => {
      expect(result.current.issues).toStrictEqual([]);
    });
  });

  test("shouldn't return issues if no found", async () => {
    (getEntityListService as jest.Mock).mockResolvedValueOnce(["123", "456"]);
    (getIssuesService as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderLinkedIssuesHook();

    await waitFor(() => {
      expect(result.current.issues).toStrictEqual([]);
    });
  });
});
