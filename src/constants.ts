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
