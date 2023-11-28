import { mockProjects } from "../../../testing";
import { getOptions } from "../getOptions";

describe("utils", () => {
  describe("getOptions", () => {
    test("should return options", () => {
      expect(getOptions(mockProjects.data)).toStrictEqual([
        {
          key: "2rOkEs3gWjCg",
          label: "Deskpro Apps",
          type: "value",
          value: "2rOkEs3gWjCg",
        },
        {
          key: "kUysu1ZlRBm",
          label: "Deskpro Space",
          type: "value",
          value: "kUysu1ZlRBm",
        },
      ]);
    });

    test.todo("should return options with key");

    test.each(
      [undefined, null, "", 0, true, false, {}],
    )("wrong value: %p", (value) => {
      expect(getOptions(value as never)).toStrictEqual([]);
    });
  });
});
