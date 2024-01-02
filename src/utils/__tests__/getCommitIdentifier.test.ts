import { getCommitIdentifier } from "../getCommitIdentifier";

describe("utils", () => {
  describe("getCommitIdentifier", () => {
    test("should return commit identifier", () => {
      expect(getCommitIdentifier("100/200/300")).toStrictEqual({
        className: "CFCommitIdentifier.Full",
        project: "100",
        repository: "200",
        commitHash: "300",
      });
    });

    test("should return null if the data is not complete", () => {
      expect(getCommitIdentifier("100")).toBeNull();
      expect(getCommitIdentifier("100/200")).toBeNull();
    });

    test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
      expect(getCommitIdentifier(payload as never)).toBeNull();
    });
  });
});
