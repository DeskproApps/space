import { getDefaultInitValues } from "../utils";
import { mockIssues } from "../../../../testing";

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

    test("should return init values for edit issue", () => {
      expect(getDefaultInitValues(mockIssues[1] as never)).toStrictEqual({
        project: "2rOkEs3gWjCg",
        title: "PageBuilder",
        description: "1. **Purpose and Functionality:** The PageBuilder component is designed to facilitate the creation and editing of web pages.",
        assignee: "2wwNis4MCPQv",
        status: "1NOYKF1rKX9x",
        dueDate: new Date("2023-12-31T00:00:00.000Z"),
        tags: ["16QR6Q2GkAIU", "2FUnnV1iyO8m", "jQ1rf0wjTms"],
      });
    });
  });
});
