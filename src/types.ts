import type { To, ParamKeyValuePair } from "react-router-dom";
import type { DropdownValueType } from "@deskpro/deskpro-ui";
import type { Context, IDeskproClient, V2ProxyRequestInitBody } from "@deskpro/app-sdk";
import type { Response, Issue } from "./services/space/types";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Nothing = undefined;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Dict<any>|RequestInit["body"]|V2ProxyRequestInitBody["body"]
  headers?: Dict<string>,
  queryParams?: string|Dict<string>|ParamKeyValuePair[],
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Response<T>;

// V2ProxyRequestInit
export type FetchOptions = Pick<RequestParams, "method"|"headers"> & V2ProxyRequestInitBody;

/** Deskpro types */
export type Settings = {
  space_url?: string,
  client_id?: string,
};

export type TicketData = {
  ticket: {
    id: string,
    subject: string,
    permalinkUrl: string,
  },
};

export type TicketContext = Context<TicketData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type UnlinkPayload = { type: "unlink", issue: Issue };

export type LogoutPayload = { type: "logout" };

export type EventPayload =
  | NavigateToChangePage
  | LogoutPayload
  | UnlinkPayload
;

/** Space */
