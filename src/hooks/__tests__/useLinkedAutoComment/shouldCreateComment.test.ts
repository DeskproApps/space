import { cleanup } from "@testing-library/react";

jest.mock("../../../services/space/createIssueCommentService");

describe("useLinkedAutoComment", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test.todo("should to called the service to create an automatic comment (link issue)");

  test.todo("should to called the service to create an automatic comment (unlink issue)");
});
