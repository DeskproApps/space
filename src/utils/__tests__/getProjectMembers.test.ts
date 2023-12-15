import { getProjectMembers } from "../getProjectMembers";
import { mockProjects } from "../../../testing";

describe("utils", () => {
  describe("getProjectMembers", () => {
    test("should return member options", () => {
      expect(getProjectMembers(mockProjects.data[1] as never)).toMatchObject([{
        "id": "3vsk2Z3bsDx6",
        "username": "davidtestacc0401",
        "name": {"firstName": "David", "lastName": "Anjonrin-Ohu"},
        "avatar": null
      }, {
        "id": "1p7tyB1dXdBR",
        "username": "jon.snow",
        "name": {"firstName": "Jon", "lastName": "Snow"},
        "avatar": "2m7zCt3aLQxn"
      }, {
        "id": "3IVGHs3OPU3R",
        "username": "alliser.thorne",
        "name": {"firstName": "Alliser", "lastName": "Thorne"},
        "avatar": "3fzcdw2MVREC"
      }, {
        "id": "2Gw6me1D6hTb",
        "username": "jeor.mormont",
        "name": {"firstName": "Jeor", "lastName": "Mormont"},
        "avatar": "4WgLfX3wztf5"
      }, {
        "id": "2wwNis4MCPQv",
        "username": "missandei",
        "name": {"firstName": "Missandei", "lastName": "."},
        "avatar": "26DURm1YWhiJ"
      }]);
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(getProjectMembers(payload as never)).toStrictEqual([]);
    });
  });
});
