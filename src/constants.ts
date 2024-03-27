/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

export const DATE_ON = "yyyy-MM-dd";

/** Deskpro */
export const APP_PREFIX = "space";

export const ENTITY = "linkedSpaceIssue";

export const DEFAULT_ERROR = "There was an error!";

export const ACCESS_TOKEN_PATH = "oauth2/access_token";

export const REFRESH_TOKEN_PATH = "oauth2/refresh_token";

export const placeholders = {
  URL: "__space_url__",
  ACCESS_TOKEN: `[user[${ACCESS_TOKEN_PATH}]]`,
  REFRESH_TOKEN: `[user[${REFRESH_TOKEN_PATH}]]`,
};

export const DESKPRO_TAG = {
  name: "Deskpro",
};

/** Space */
export const BASE_URL = `${placeholders.URL}`;

export const SCOPES = [
  "global:Project.View",
  "global:Profile.View",
  "global:Project.Issues.View",
  "global:Project.Issues.Edit",
  "global:Project.Issues.Create",
  "global:Project.Issues.ManageTags",
  "global:Project.Issues.PostComments",
  "global:Team.View",
  "global:Locations.View",
  "global:VcsRepository.Read",
  "global:Channel.ViewMessages",
];

export const TAG_FIELDS = ["id", "archived", "name", "projectId", "parent"];

export const USER_FIELDS = ["id", "avatar", "username", "name(lastName,firstName)"];

export const STATUS_FIELDS = ["id", "archived", "color", "name", "resolved"];

export const COMMENT_FIELDS = [
  "id",
  "text",
  "created",
  "details",
  `author(name,details(user(${USER_FIELDS.join(",")})))`,
];

export const TEAM_FIELDS = ["id", "name", "parent!"];

export const REPOSITORY_FIELDS = ["id", "name"];

export const PROJECT_FIELDS = [
  "id",
  "name",
  "key(key)",
  `adminProfiles(${USER_FIELDS.join(",")})`,
  `memberProfiles(${USER_FIELDS.join(",")})`,
  `repos(${REPOSITORY_FIELDS.join(",")})`,
];

export const MESSAGE_FIELDS = [`messages(${COMMENT_FIELDS.join(",")})`];

export const SIMPLE_ISSUE_FIELDS = [
  "id",
  "title",
  "number",
  `status(${STATUS_FIELDS.join(",")})`,
  `projectRef(${PROJECT_FIELDS.join(",")})`,
];

export const SUB_ITEM_FIELDS = [
  "id",
  "name",
  `root(children(id,simpleText,simpleDone,issue(${SIMPLE_ISSUE_FIELDS.join(",")})))`,
];

export const COMMIT_FIELDS = ["commitId", "message", "repository", "project(id)"];

export const LOCATION_FIELDS = ["id", "name", "parent!"];

export const ATTACHMENT = ["id", "filename", "sizeBytes", "name"];

export const CUSTOM_FIELD_FIELDS = [
  "href",
  "value(id,value)",
  "values(id,value)",
  `profile(${USER_FIELDS.join(",")})`,
  `profiles(${USER_FIELDS.join(",")})`,
  `team(${TEAM_FIELDS.join(",")})`,
  "location(id,name)",
  "project(id,name)",
  `issue(${SIMPLE_ISSUE_FIELDS.join(",")})`,
  `issues(${SIMPLE_ISSUE_FIELDS.join(",")})`,
  `commit(commit(${COMMIT_FIELDS.join(",")}))`,
  `commits(commit(${COMMIT_FIELDS.join(",")}))`,
];

export const ISSUE_FIELDS = [
  "id",
  "title",
  "number",
  "creationTime",
  "dueDate",
  "projectId",
  "description",
  `parents(id,title,number,projectRef(${PROJECT_FIELDS.join(",")}))`,
  `projectRef(${PROJECT_FIELDS.join(",")})`,
  `tags(${TAG_FIELDS.join(",")})`,
  `assignee(${USER_FIELDS.join(",")})`,
  `status(${STATUS_FIELDS.join(",")})`,
  `subItemsList(${SUB_ITEM_FIELDS.join(",")})`,
  `attachments(details(${ATTACHMENT.join(",")}))`,
  `customFields(${CUSTOM_FIELD_FIELDS.join(",")})`,
];

export const fields = {
  ISSUE: ISSUE_FIELDS.join(","),
  PROJECT: PROJECT_FIELDS.join(","),
  TAG: TAG_FIELDS.join(","),
  ASSIGNEE: USER_FIELDS.join(","),
  STATUS: STATUS_FIELDS.join(","),
  TEAM: TEAM_FIELDS.join(","),
  LOCATION: LOCATION_FIELDS.join(","),
  COMMENT: COMMENT_FIELDS.join(","),
};

export enum CustomFieldsMap {
  StringCFValue = "StringCFValue",
  StringListCFValue = "StringListCFValue",
  IntCFValue = "IntCFValue",
  IntListCFValue = "IntListCFValue",
  EnumCFValue = "EnumCFValue",
  EnumListCFValue = "EnumListCFValue",
  BooleanCFValue = "BooleanCFValue",
  DateCFValue = "DateCFValue",
  DateTimeCFValue = "DateTimeCFValue",
  PercentageCFValue = "PercentageCFValue",
  ProfileCFValue = "ProfileCFValue",
  ProfileListCFValue = "ProfileListCFValue",
  TeamCFValue = "TeamCFValue",
  LocationCFValue = "LocationCFValue",
  ProjectCFValue = "ProjectCFValue",
  UrlCFValue = "UrlCFValue",
  IssueCFValue = "IssueCFValue",
  IssueListCFValue = "IssueListCFValue",
  AutonumberCFValue = "AutonumberCFValue",
  VcsCommitCFValue = "VcsCommitCFValue",
  VcsCommitListCFValue = "VcsCommitListCFValue",
}

export enum CustomFieldsType {
  STRING = "STRING",
  INTEGER = "INTEGER",
  ENUM = "ENUM",
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
  DATE_TIME = "DATE_TIME",
  PERCENTAGE = "PERCENTAGE",
  PROFILE = "PROFILE",
  TEAM = "TEAM",
  LOCATION = "LOCATION",
  PROJECT = "PROJECT",
  URL = "URL",
  AUTONUMBER = "AUTONUMBER",
  ISSUE = "ISSUE",
  COMMIT = "COMMIT",
}
