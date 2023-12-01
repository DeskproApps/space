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

export const placeholders = {
  URL: "__space_url__",
  ACCESS_TOKEN: `[user[${ACCESS_TOKEN_PATH}]]`,
};

/** Space */
export const BASE_URL = `${placeholders.URL}`;

const PROJECT_FIELDS = ["id", "name", "key(key)"];

const TAG_FIELDS = ["id", "archived", "name", "projectId", "parent"];

const ASSIGNEE_FIELDS = ["id", "avatar", "username", "name(lastName,firstName)"];

const STATUS_FIELDS = ["id", "archived", "color", "name", "resolved"];

const ISSUES_FIELDS = [
  "id",
  "title",
  "number",
  "creationTime",
  "dueDate",
  "projectId",
  `projectRef(${PROJECT_FIELDS.join(",")})`,
  `tags(${TAG_FIELDS.join(",")})`,
  `assignee(${ASSIGNEE_FIELDS.join(",")})`,
  `status(${STATUS_FIELDS.join(",")})`,
];

export const fields = {
  ISSUE: ISSUES_FIELDS.join(","),
  PROJECT: PROJECT_FIELDS.join(","),
  TAG: TAG_FIELDS.join(","),
  ASSIGNEE: ASSIGNEE_FIELDS.join(","),
  STATUS: STATUS_FIELDS.join(","),
};
