import { cleanup, renderHook, act } from "@testing-library/react";
import { createIssueCommentService } from "../../../services/space";
import { useLinkedAutoComment } from "../../useLinkedAutoComment";
import { mockIssues } from "../../../../testing";
import type { Result } from "../../useLinkedAutoComment";

const mockIssue = mockIssues[0];

jest.mock("../../../services/space/createIssueCommentService");

jest.mock("@deskpro/app-sdk", () => ({
  ...jest.requireActual("@deskpro/app-sdk"),
  useDeskproLatestAppContext: () => ({
    context: {
      settings: { add_comment_when_linking: false },
      data: {
        ticket: { id: "215", subject: "Big ticket", permalinkUrl: "https://permalink.url" },
      },
    },
  }),
}));

describe("useAutoCommentLinkedIssue", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("shouldn't to called the service to create an automatic comment (link issue)", async () => {
    (createIssueCommentService as jest.Mock).mockResolvedValueOnce(() => Promise.resolve());

    const { result } = renderHook<Result, unknown>(() => useLinkedAutoComment());

    await act(async () => {
      await result.current.addLinkComment(mockIssue as never);
    });

    expect(createIssueCommentService).not.toHaveBeenCalled();
  });

  test("shouldn't to called the service to create an automatic comment (unlink issue)", async () => {
    (createIssueCommentService as jest.Mock).mockResolvedValueOnce(() => Promise.resolve());

    const { result } = renderHook<Result, unknown>(() => useLinkedAutoComment());

    await act(async () => {
      await result.current.addUnlinkComment(mockIssue as never);
    });

    expect(createIssueCommentService).not.toHaveBeenCalled();
  });
});
