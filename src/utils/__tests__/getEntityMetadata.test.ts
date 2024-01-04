import { getEntityMetadata } from "../getEntityMetadata";
import { mockIssues } from "../../../testing/mocks";

describe("getEntityMetadata", () => {
  test("should return metadata", () => {
    expect(getEntityMetadata(mockIssues[1] as never))
      .toStrictEqual({
        id: "3R3ntR3bLJee",
        key: "MAIN-T-7",
        title: "PageBuilder",
        project: "Deskpro Apps",
        status: "In progress",
        tags: ["app-builder", "test", "dev"],
        assignee: { username: "zpawn", name: "ilia makarov" },
      });
  });

  test("shouldn't return metadata", () => {
    expect(getEntityMetadata()).toBeUndefined();
  });
});
