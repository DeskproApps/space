import { getIssueKey } from "../getIssueKey";
import { mockIssues } from "../../../testing";

describe("utils", () => {
  describe("isForm", () => {
    test("should navigate payload", () => {
      expect(getIssueKey(mockIssues[1] as never)).toBe("MAIN-T-7");
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(getIssueKey(payload as never)).toBe("");
    });
  });
});
