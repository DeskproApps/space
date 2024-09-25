import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import {
    getEntityListService,
    setAccessTokenService, setRefreshTokenService,
} from "../../services/deskpro";
import {
  getAccessTokenService,
  getOrganizationService,
} from "../../services/space";
import { getQueryParams } from "../../utils";
import { SCOPES, DEFAULT_ERROR } from "../../constants";
import type { OAuth2StaticCallbackUrl } from "@deskpro/app-sdk";
import type { Maybe } from "../../types";

export type Result = {
  poll: () => void,
  authUrl: string|null,
  error: Maybe<string>,
  isLoading: boolean,
};

const useLogin = (): Result => {
  const key = useMemo(() => uuidv4(), []);
  const navigate = useNavigate();
  const [error, setError] = useState<Maybe<string>>(null);
  const [callback, setCallback] = useState<OAuth2StaticCallbackUrl|undefined>();
  const [authUrl, setAuthUrl] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { context } = useDeskproLatestAppContext();
  const { client } = useDeskproAppClient();
  const clientId = context?.settings?.client_id;
  const spaceUrl = context?.settings?.space_url;
  const ticketId = context?.data?.ticket.id;

  useInitialisedDeskproAppClient(
    (client) => {
      client.oauth2()
        .getGenericCallbackUrl(key, /code=(?<token>[^&]+)/, /state=(?<key>[^&]+)/)
        .then(setCallback);
    },
    [setCallback]
  );

  useEffect(() => {
    if (callback?.callbackUrl && clientId && spaceUrl) {
      setAuthUrl(`${spaceUrl}/oauth/auth?${getQueryParams({
        response_type: "code",
        redirect_uri: callback.callbackUrl,
        client_id: clientId,
        access_type: "offline",
        request_credentials: "default",
        state: key,
        scope: SCOPES.join(" "),
      })}`);
    }
  }, [callback, spaceUrl, clientId, key]);

  const poll = useCallback(() => {
    if (!client || !callback?.poll || !ticketId) {
      return;
    }

    setError(null);
    setTimeout(() => setIsLoading(true), 1000);

    callback.poll()
      .then(({ token }) => getAccessTokenService(client, token, callback.callbackUrl))
      .then(({ access_token, refresh_token }) => Promise.all([
          setAccessTokenService(client, access_token),
          setRefreshTokenService(client, refresh_token),
        ]))
      .then(() => getOrganizationService(client))
      .then((org) => !org.id
        ? Promise.reject()
        : getEntityListService(client, ticketId))
      .then((entityIds) => navigate(entityIds?.length ? "/home" : "/issues/link"))
      .catch((err) => {
        setIsLoading(false);
        setError(err?.data?.error_description || DEFAULT_ERROR);
      });
  }, [client, callback, navigate, ticketId]);

  return { authUrl, poll, error, isLoading };
};

export { useLogin };
