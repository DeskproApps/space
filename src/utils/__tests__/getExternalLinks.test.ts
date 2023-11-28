import { getIssueLink, getProjectLink } from "../getExternalLinks";
import { mockContext, mockIssues, mockProjects } from "../../../testing";

describe("utils", () => {
  describe("getExternalLinks", () => {

    describe("getProjectLink", () => {
      test("should return project link", () => {
        expect(getProjectLink(mockContext.settings, mockProjects.data[0] as never))
          .toBe("https://space.test/p/main");
      });
      test("should return undefined if something isn't pass", () => {
        expect(getProjectLink()).toBeUndefined();
        expect(getProjectLink(mockContext.settings)).toBeUndefined();
        expect(getProjectLink(null, mockProjects.data[0] as never)).toBeUndefined();
      });
    });

    describe("getIssueLink", () => {
      test("should return issue link", () => {
        const issueLink = getIssueLink(
          mockContext.settings,
          mockProjects.data[0] as never,
          mockIssues.data[1] as never,
        );
        expect(issueLink).toBe("https://space.test/p/main/issues/7");
      });

      test("should return undefined if something isn't pass", () => {
        expect(getIssueLink()).toBeUndefined();
        expect(getIssueLink(mockContext.settings)).toBeUndefined();
        expect(getIssueLink(null, mockProjects.data[0] as never)).toBeUndefined();
        expect(getIssueLink(null, null, mockIssues.data[1] as never)).toBeUndefined();
      });
    });
  });
});
