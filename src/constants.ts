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

/** Space */
export const BASE_URL = `${placeholders.URL}`;

export const SCOPES = [
  "global:Project.View",
  "global:Project.Issues.View",
  "global:Profile.View",
];

export const PROJECT_FIELDS = ["id", "name", "key(key)"];

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

export const MESSAGE_FIELDS = [`messages(${COMMENT_FIELDS.join(",")})`];

export const SIMPLE_ISSUE_FIELDS = [
  "id",
  "title",
  `status(${STATUS_FIELDS.join(",")})`,
];

export const SUB_ITEM_FIELDS = [
  "id",
  "name",
  `root(children(id,simpleText,simpleDone,issue(${SIMPLE_ISSUE_FIELDS.join(",")})))`,
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
];

export const fields = {
  ISSUE: ISSUE_FIELDS.join(","),
  PROJECT: PROJECT_FIELDS.join(","),
  TAG: TAG_FIELDS.join(","),
  ASSIGNEE: USER_FIELDS.join(","),
  STATUS: STATUS_FIELDS.join(","),
};
