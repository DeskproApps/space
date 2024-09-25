import { getCustomIssueValues } from "../utils";
import mockValues from "./mockValues.json";
import { mockCustomFieldsConfig } from "../../../../testing";

describe("IssueForm", () => {
  describe("getCustomIssueValues", () => {
    test("should return required values", () => {
      mockValues.customFields["1zAzn40tHz2a"] = new Date(mockValues.customFields["1zAzn40tHz2a"]) as unknown as string;
      mockValues.customFields["2CR4aa2J8Z3K"] = new Date(mockValues.customFields["2CR4aa2J8Z3K"]) as unknown as string;

      expect(getCustomIssueValues(mockValues.customFields as never, mockCustomFieldsConfig as never[]))
        .toStrictEqual({
          customFields: [
            {
              fieldId: "1lZ4bB2DbLbE",
              value: { className: "StringCFValue", value: "some custom text" }
            },
            {
              fieldId: "2gCoa44U7Ooo",
              value: {
                className: "StringListCFValue",
                values: ["item1", "item2", "item3", "item4", "item5"],
              }
            },
            {
              fieldId: "1S6CxP14owHM",
              value: { className: 'IntCFValue', value: '100500' },
            },
            {
              fieldId: "4QoBZH2f5Ppz",
              value: { className: "IntListCFValue", values: ["1","2","3","4","5"] },
            },
            {
              fieldId: "vQR2h1gPxzk",
              value: {
                className: "EnumCFValue",
                value: {
                  id: "4E0ehX4CrhQ7",
                  value: "item 2",
                  principal: {
                    className: "CUserPrincipalDetails",
                    user: { id: "2wwNis4MCPQv" }
                  }
                },
              },
            },
            {
              fieldId: "1jzp3w0eMjb1",
              value: {
                className: "EnumListCFValue",
                values: [
                  { id: "hISIV0I2C60", value: "item 01" },
                  { id: "155idr0PMOml", value: "item 03" },
                  { id: "1cXDC91nVHkD", value: "item 05" }
                ]
              }
            },
            {
              fieldId: "13Nmgh1t6Mln",
              value: { className: "BooleanCFValue", value: true },
            },
            {
              fieldId: "1zAzn40tHz2a",
              value: { className: "DateCFValue", value: "2023-12-23" }
            },
            {
              fieldId: "2CR4aa2J8Z3K",
              value: { className: "DateTimeCFValue", value: "2024-01-01T13:15:00Z" }
            },
            {
              fieldId: "3JyhbW3upSFI",
              value: { className: "PercentageCFValue", value: "73" },
            },
            {
              fieldId: "1J8EKe1Lh8Vb",
              value: {
                className: "ProfileCFInputValue",
                profile: { className: "ProfileIdentifier.Id", id: "3vsk2Z3bsDx6" },
              },
            },
            {
              fieldId: "3OfM8O2UC2Sz",
              value: {
                className: "ProfileListCFInputValue",
                profiles: [
                  { className: "ProfileIdentifier.Id", id: "1p7tyB1dXdBR" },
                  { className: "ProfileIdentifier.Id", id: "3IVGHs3OPU3R" },
                  { className: "ProfileIdentifier.Id", id: "2Gw6me1D6hTb" },
                ],
              },
            },
            {
              fieldId: "3L0gLL46bR6c",
              value: { className: "TeamCFInputValue", team: "31KgHK4fhraG" },
            },
            {
              fieldId: "I6gmC1eZKte",
              value: { className: "LocationCFInputValue", location: "2rsVJi4JFhMk" },
            },
            {
              fieldId: "3EnuD84TT3nQ",
              value: {
                className: "ProjectCFInputValue",
                project: { className: "ProjectIdentifier.Id", id: "kUysu1ZlRBm" },
              },
            },
            {
              fieldId: "2AFb1615qzQD",
              value: { className: "UrlCFValue", href: "https://custom.link" },
            },
            {
              fieldId: "3JAXW838M6Gx",
              value: {
                className: "IssueCFInputValue",
                issue: { className: "IssueIdentifier.Id", id: "1Hb7rA00cBqO" },
              },
            },
            {
              fieldId: "2EYotk0tmAjF",
              value: {
                className: "IssueListCFInputValue",
                issues: [
                  { className: "IssueIdentifier.Id", id: "1Hb7rA00cBqO" },
                  { className: "IssueIdentifier.Id", id: "4RrVBd3gf634" },
                  { className: "IssueIdentifier.Id", id: "4S5zxv3fKSgK" },
                ],
              },
            },
            {
              fieldId: "4cjHj944dIOc",
              value: {
                className: "VcsCommitCFInputValue",
                commit: {
                  className: "CFCommitIdentifier.Full",
                  project: "kUysu1ZlRBm",
                  repository: "space-app",
                  commitHash: "18d974e89312a1c73277d5aa7bd6f94fb40af77e",
                },
              },
            },
            {
              fieldId: "S9F2m20bO2o",
              value: {
                className: "VcsCommitListCFInputValue",
                commits: [
                  {
                    className: "CFCommitIdentifier.Full",
                    project: "kUysu1ZlRBm",
                    repository: "space-app",
                    commitHash: "12ccd0d679213b1e3fe6dfcb425712e5ee3ac703",
                  },
                  {
                    className: "CFCommitIdentifier.Full",
                    project: "kUysu1ZlRBm",
                    repository: "space-app",
                    commitHash: "36f141485079365bd46bf2011eadf9403abaf0cb",
                  },
                ],
              },
            },
          ],
        });
    });
  });
});
