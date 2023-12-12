import { getInitValues } from "../utils";

describe("IssueForm", () => {
  describe("getInitValues", () => {
    test("should return init values for new issue", () => {
      expect(getInitValues()).toStrictEqual({
        project: "",
        title: "",
        description: "",
        assignee: "",
        status: "",
        dueDate: undefined,
        tags: [],
      });
    });

    test.todo("should return init values for edit issue");
  });
});
