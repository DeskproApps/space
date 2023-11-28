import cloneDeep from "lodash/cloneDeep";
import { enhanceIssue } from "../enhanceIssue";
import {
  mockIssues,
  mockContext,
  mockProjects,
  mockProjectTags,
  mockIssueStatuses,
  mockEnhancedIssue,
  mockProjectMembers,
} from "../../../testing";

describe("utils", () => {
  describe("enhanceIssue", () => {
    test("should return enhanced Issue", () => {
      expect(enhanceIssue(
        mockContext.settings,
        mockIssues.data[1] as never,
        mockProjects.data as never[],
        mockProjectTags.data as never[],
        mockProjectMembers.data as never[],
        mockIssueStatuses,
      )).toStrictEqual(mockEnhancedIssue);
    });

    test("should return enhanced Issue without project", () => {
      expect(enhanceIssue(
        mockContext.settings,
        mockIssues.data[1] as never,
        undefined,
        mockProjectTags.data as never[],
        mockProjectMembers.data as never[],
        mockIssueStatuses,
      )).toStrictEqual({
        ...cloneDeep(mockEnhancedIssue),
        key: null,
        link: undefined,
        project: null,
      });
    });

    test("should return enhanced Issue without tags", () => {
      expect(enhanceIssue(
        mockContext.settings,
        mockIssues.data[1] as never,
        mockProjects.data as never[],
        undefined,
        mockProjectMembers.data as never[],
        mockIssueStatuses,
      )).toStrictEqual({ ...cloneDeep(mockEnhancedIssue), tags: [] });
    });

    test("should return enhanced Issue without assignee", () => {
      expect(enhanceIssue(
        mockContext.settings,
        mockIssues.data[1] as never,
        mockProjects.data as never[],
        mockProjectTags.data as never[],
        undefined,
        mockIssueStatuses,
      )).toStrictEqual({ ...cloneDeep(mockEnhancedIssue), assignee: undefined });
    });

    test("should return enhanced Issue without status", () => {
      expect(enhanceIssue(
        mockContext.settings,
        mockIssues.data[1] as never,
        mockProjects.data as never[],
        mockProjectTags.data as never[],
        mockProjectMembers.data as never[],
      )).toStrictEqual({ ...cloneDeep(mockEnhancedIssue), status: undefined });
    });
  });
});
