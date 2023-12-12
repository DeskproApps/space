import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { getIssuesService, getIssueMessagesService } from "../../services/space";
import { useIssue } from "../useIssue";
import { wrap, mockIssues, mockIssueMessages } from "../../../testing";
import type { Result } from "../useIssue";

jest.mock("../../services/space/getIssuesService");
jest.mock("../../services/space/getIssueMessagesService");

const renderIssueHook = (issueId?: string) => renderHook<Result, unknown>(
  () => useIssue(issueId),
  { wrapper: ({ children }) => wrap(children, { query: true, appSdk: true }) },
);

describe("useIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should return Issue and Comments", async () => {
    (getIssuesService as jest.Mock).mockResolvedValueOnce(mockIssues);
    (getIssueMessagesService as jest.Mock).mockResolvedValueOnce(mockIssueMessages);

    const { result } = renderIssueHook("issue-001");

    await waitFor(() => {
      expect(result.current.issue).toStrictEqual(mockIssues[0]);
      expect(result.current.comments).toStrictEqual([
        mockIssueMessages.messages[0],
        mockIssueMessages.messages[1],
      ]);
    });
  });

  test("shouldn't return Issue and Comments if no issueId", async () => {
    (getIssuesService as jest.Mock).mockResolvedValueOnce(mockIssues);
    (getIssueMessagesService as jest.Mock).mockResolvedValueOnce(mockIssueMessages);

    const { result } = renderIssueHook();

    await waitFor(() => {
      expect(result.current.issue).toBeUndefined();
      expect(result.current.comments).toStrictEqual([]);
    });
  });
});
