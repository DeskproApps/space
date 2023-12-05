import omit from "lodash/omit";
import { isUnlinkPayload } from "../isUnlinkPayload";
import { mockIssues } from "../../../testing";

const payload = {
  type: "unlink",
  issue: mockIssues[0],
};

describe("isUnlinkPayload", () => {
  test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
    expect(isUnlinkPayload(payload as never)).toBeFalsy();
  });

  test("shouldn't be unlink payload", () => {
    expect(isUnlinkPayload(omit(payload, ["issue"]) as never)).toBeFalsy();
  });

  test("should unlink payload", () => {
    expect(isUnlinkPayload(payload as never)).toBeTruthy();
  });
});
