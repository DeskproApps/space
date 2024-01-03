import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockIssueMessages } from "../../../../../testing";
import { Comments } from "../Comments";
import type { Props } from "../Comments";

jest.mock('react-time-ago', () => jest.fn().mockReturnValue('7h 30m'));

const mockComments = [
  mockIssueMessages.messages[0],
  mockIssueMessages.messages[1],
];

const renderComments = (props?: Partial<Props>) => render((
  <Comments
    comments={props?.comments || mockComments as never}
    onNavigateToAddComment={props?.onNavigateToAddComment || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("ViewIssue", () => {
  describe("Comments", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderComments();

      expect(await findByText(/Comments \(2\)/i)).toBeInTheDocument();
      expect(await findByText(/formatted comment/i)).toBeInTheDocument();
      expect(await findByText(/one comment/i)).toBeInTheDocument();
    });

    test("should empty", async () => {
      const { findByText } = renderComments({ comments: [] });

      expect(await findByText(/Comments \(0\)/i)).toBeInTheDocument();
    });

    test("should navigate to new comment", async () => {
      const mockOnNavigateToAddComment = jest.fn();
      const { container } = renderComments({
        onNavigateToAddComment: mockOnNavigateToAddComment,
      });
      const button = container.querySelector("button > svg[data-icon=plus]") as Element;

      await userEvent.click(button);

      expect(mockOnNavigateToAddComment).toHaveBeenCalled();
    });
  });
});
