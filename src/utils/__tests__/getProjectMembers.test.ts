import { getProjectMembers } from "../getProjectMembers";
import { mockProjects } from "../../../testing";

describe("utils", () => {
  describe("getProjectMembers", () => {
    test("should return member options", () => {
      expect(getProjectMembers(mockProjects.data[1] as never)).toMatchObject([
        {
          "id": "3vsk2Z3bsDx6",
          "username": "davidtestacc0401",
          "name": { "firstName": "David", "lastName": "Test" },
          "avatar": null
        },
        {
          "id": "2wwNis4MCPQv",
          "username": "zpawn",
          "name": {"firstName": "ilia", "lastName": "makarov" },
          "avatar": "iYa8y1aEcMz"
        },
      ]);
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(getProjectMembers(payload as never)).toStrictEqual([]);
    });
  });
});
