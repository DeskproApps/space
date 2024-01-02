import { getDefaultInitValues } from "../utils";

describe("IssueForm", () => {
  describe("getDefaultInitValues", () => {
    test("should return init values for new issue", () => {
      expect(getDefaultInitValues()).toStrictEqual({
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
