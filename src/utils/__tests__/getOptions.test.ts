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

    test("should return options with key", () => {
      expect(getOptions(mockProjects.data[1].memberProfiles, "username"))
        .toStrictEqual([
          {
            key: "3vsk2Z3bsDx6",
            value: "3vsk2Z3bsDx6",
            label: "davidtestacc0401",
            type: "value",
          },
          {
            key: "1p7tyB1dXdBR",
            value: "1p7tyB1dXdBR",
            label: "jon.snow",
            type: "value",
          },
          {
            key: "3IVGHs3OPU3R",
            value: "3IVGHs3OPU3R",
            label: "alliser.thorne",
            type: "value",
          },
          {
            key: "2Gw6me1D6hTb",
            value: "2Gw6me1D6hTb",
            label: "jeor.mormont",
            type: "value",
          },
        ]);
    });

    test.each(
      [undefined, null, "", 0, true, false, {}],
    )("wrong value: %p", (value) => {
      expect(getOptions(value as never)).toStrictEqual([]);
    });
  });
});
