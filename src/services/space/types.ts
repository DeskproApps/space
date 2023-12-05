import type { DateTime, Maybe } from "../../types";
import type { components, paths } from "./schema";

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
  expires_in: number,
  scope: string,
};

export type Organization = components["schemas"]["OrganizationRecord"];

export type Project = components["schemas"]["PR_Project"];

export type Issue = components["schemas"]["Issue"];

export type IssueStatus = components["schemas"]["IssueStatus"];

export type IssueTag = components["schemas"]["PlanningTag"];

export type IssueQueryParams = paths["/projects/{project}/planning/issues"]["get"]["parameters"]["query"];

export type MemberOnProject = components["schemas"]["ParticipantOnProject"];

export type Member = components["schemas"]["TD_MemberProfile"];

export type IssueSubItem = components["schemas"]["PlanItem"];

export type Messages = components["schemas"]["GetMessagesResponse"]

export type IssueComment = components["schemas"]["ChannelItemRecord"];

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
