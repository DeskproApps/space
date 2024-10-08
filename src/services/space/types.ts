import { CustomFieldsMap } from "../../constants";
import type { DateTime, Maybe } from "../../types";
import type { components, paths } from "./schema";

export type { components, paths } from "./schema";

export type Response<T> = Promise<T>;

export type Pagination<T> = {
  next: string,
  totalCount: Maybe<number>,
  data: T[],
}

export type SpaceAPIError = {
  error: string,
  error_description: string,
};

export type AccessToken = {
  token_type: "Bearer",
  access_token: string,
  refresh_token: string,
  expires_in: number,
  scope: string,
};

export type DateAt = {
  iso: string,
  day: number,
  month: number,
  year: number,
};

export type DateOn = {
  iso: DateTime,
  timestamp: number,
};

export type DateType = DateTime|DateAt|DateOn;

export type Organization = components["schemas"]["OrganizationRecord"];

export type Team = components["schemas"]["TD_Team"];

export type Location = components["schemas"]["TD_Location"];

export type Project = components["schemas"]["PR_Project"];

export type IssueStatus = components["schemas"]["IssueStatus"];

export type IssueTag = components["schemas"]["PlanningTag"];

export type IssueQueryParams = paths["/projects/{project}/planning/issues"]["get"]["parameters"]["query"];

export type MemberOnProject = components["schemas"]["ParticipantOnProject"];

export type Member = components["schemas"]["TD_MemberProfile"];

export type IssueSubItem = components["schemas"]["PlanItem"];

export type Messages = components["schemas"]["GetMessagesResponse"]

export type IssueComment = Omit<components["schemas"]["ChannelItemRecord"], "author"|"created"> & {
  created: null|DateAt|DateOn,
  author: Omit<components["schemas"]["CPrincipal"], "details"> & {
    details: components["schemas"]["CUserPrincipalDetails"],
  },
};

export type CustomField = {
  className: keyof typeof CustomFieldsMap,
} & Maybe<(
  | components["schemas"]["StringCFValue"]
  | components["schemas"]["StringListCFValue"]
  | components["schemas"]["IntCFValue"]
  | components["schemas"]["IntListCFValue"]
  | components["schemas"]["EnumCFValue"]
  | components["schemas"]["EnumListCFValue"]
  | components["schemas"]["BooleanCFValue"]
  | Omit<components["schemas"]["DateCFValue"], "value"> & { value?: Maybe<DateAt> }
  | Omit<components["schemas"]["DateTimeCFValue"], "value"> & { value?: DateOn }
  | components["schemas"]["PercentageCFValue"]
  | components["schemas"]["ProfileCFValue"]
  | components["schemas"]["ProfileListCFValue"]
  | components["schemas"]["TeamCFValue"]
  | components["schemas"]["LocationCFValue"]
  | components["schemas"]["ProjectCFValue"]
  | components["schemas"]["UrlCFValue"]
  | Omit<components["schemas"]["IssueCFValue"], "issue"> & { issue: Maybe<Issue> }
  | Omit<components["schemas"]["IssueListCFValue"], "issues"> & { issues: Maybe<Issue[]> }
  | components["schemas"]["AutonumberCFValue"]
  | components["schemas"]["VcsCommitCFValue"]
  | components["schemas"]["VcsCommitListCFValue"]
)>;

export type Attach = Omit<components["schemas"]["AttachmentInfo"], "details"> & {
  details?: components["schemas"]["FileAttachment"]&components["schemas"]["ImageAttachment"],
};

export type Issue = Omit<
  components["schemas"]["Issue"],
  "customFields"|"parents"|"dueDate"|"creationTime"|"attachments"
> & {
  parents?: Issue[],
  customFields?: CustomField[],
  dueDate?: null|DateAt|DateOn,
  creationTime?: null|DateAt|DateOn,
  attachments: null|Attach[],
};

export type IssueInput = Omit<
  paths["/projects/{project}/planning/issues"]["post"]["requestBody"]["content"]["application/json"],
  "assignee"
> & {
  assignee: Maybe<Member["id"]>,
};

export type IssueCommentInput = components["schemas"]["ChatMessage.Text"];

export type CustomFieldData = components["schemas"]["CustomFieldData"];

export type FieldVisibility = Required<components["schemas"]["IssueFieldVisibility"]>;

export type FieldsVisibility = Omit<components["schemas"]["TrackerIssueFieldVisibility"], "systemIssueFieldVisibilities"> & {
  systemIssueFieldVisibilities: FieldVisibility[],
};

export type CFCommit = Omit<components["schemas"]["VcsCommitCFValue"], "commit"> & {
  commit: Omit<components["schemas"]["CFCommitInfoBase"], "commit"> & {
    commit: components["schemas"]["CommitInfo"];
  };
};

export type CFCommits = {
  commits: Array<CFCommit["commit"]>,
};
