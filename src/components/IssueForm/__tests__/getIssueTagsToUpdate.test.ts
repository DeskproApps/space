import { getIssueTagsToUpdate } from "../utils";
import { mockIssues } from "../../../../testing";
import mockValues from "./mockValues.json";

const mockIssue = mockIssues[1];

describe("TaskForm", () => {
  describe("getLabelsToUpdate", () => {

    test("should return tags to update", () => {
      expect(getIssueTagsToUpdate(mockIssue as never, mockValues as never))
        .toEqual({ add: ["1fbZWo14TczB"], rem: ["2FUnnV1iyO8m", "jQ1rf0wjTms"] });

      expect(getIssueTagsToUpdate(
        { tags: [{ id: "tag-001" }, { id: "tag-002" }] } as never,
        { tags: ["tag-003"] } as never,
      ))
        .toEqual({ add: ["tag-003"], rem: ["tag-001", "tag-002"] });
    });

    test("should return nothing to update", () => {
      expect(getIssueTagsToUpdate(
        { tags: [] } as never,
        { tags: [] } as never,
      )).toEqual({ add: [], rem: [] });

      expect(getIssueTagsToUpdate(
        { tags: [{ id: "tag-001"}, { id: "tag-002"}] } as never,
        { tags: ["tag-001", "tag-002"] } as never,
      ))
        .toEqual({ add: [], rem: [] });
    });
  });
});
