import { getFullName } from "../getFullName";

describe("utils", () => {
  describe("getFullName", () => {
    test("should return full_name", () => {
      expect(getFullName({
        username: "jorah.mormont",
        name: { firstName: "Jorah", lastName: "Mormont" },
      } as never)).toBe("Jorah Mormont");
    });

    test("should return username", () => {
      expect(getFullName({
        username: "daario.naharis",
      } as never)).toBe("daario.naharis");
    });

    test("should return only FirstName or LastName", () => {
      expect(getFullName({ name: { firstName: "Missandei" } } as never))
        .toBe("Missandei");

      expect(getFullName({ name: { lastName: "Missandei" } } as never))
        .toBe("Missandei");
    });

    test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
      expect(getFullName(payload as never)).toBe("");
    });
  });
});
