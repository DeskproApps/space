import { normalizeFieldsVisibility } from "../normalizeFieldsVisibility";
import { mockFieldsVisibility } from "../../../testing";

describe("utils", () => {
  describe("normalizeFieldsVisibility", () => {
    test("should return normalized fields visibility object", () => {
      expect(normalizeFieldsVisibility(mockFieldsVisibility as never)).toStrictEqual({
        PROJECT: true,
        ASSIGNEE: true,
        CREATED_BY: true,
        STATUS: true,
        TAG: true,
        CREATION_TIME: true,
        DUE_DATE: true,
        TITLE: true,
        DELETED: true,
        PARENT_ISSUES: true,
        CHECKLISTS: true,
        BOARD: true,
        SUBSCRIBER: true,
        IMPORT_TRANSACTION: true,
      });
    });

    test.each(
      [undefined, null, "", 0, true, false, {}],
    )("wrong value: %p", (value) => {
      expect(normalizeFieldsVisibility(value as never)).toStrictEqual({});
    });
  });
});
