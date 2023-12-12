import { isIssue } from "../isIssue";
import { mockIssues } from "../../../testing";

describe("utils", () => {
  describe("isIssue", () => {
    test("should issue", () => {
      expect(isIssue(mockIssues[0] as never)).toBeTruthy();
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(isIssue(payload as never)).toBeFalsy();
    });
  });
});
