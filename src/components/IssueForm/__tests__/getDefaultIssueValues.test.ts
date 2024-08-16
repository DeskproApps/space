import { pick, cloneDeep } from "lodash-es";
import { getDefaultIssueValues } from "../utils";
import mockValues from "./mockValues.json";

describe("IssueForm", () => {
  describe("getDefaultIssueValues", () => {
    test("should return required values", () => {
      const values = pick(cloneDeep(mockValues), ["title", "status"]);
      expect(getDefaultIssueValues(values as never)).toStrictEqual({
        title: "Issue for Test",
        description: undefined,
        assignee: undefined,
        status: "3nuoYD3PXgjA",
        dueDate: null,
        tags: [],
      });
    });

    test("should return full issue values", () => {
      expect(getDefaultIssueValues(mockValues as never)).toStrictEqual({
        title: "Issue for Test",
        description: "Description __with__ _markdown_",
        assignee: "2wwNis4MCPQv",
        status: "3nuoYD3PXgjA",
        dueDate: "2023-12-22",
        tags: ["1fbZWo14TczB", "16QR6Q2GkAIU"],
      });
    });
  });
});
