import { useState, useCallback } from "react";
import { getQueryParams } from "../../utils";
import { SCOPES, } from "../../constants";
import { useNavigate } from "react-router-dom";
import { getAccessTokenService, getOrganizationService } from "../../services/space";
import { getEntityListService, setAccessTokenService, setRefreshTokenService } from "../../services/deskpro";
import { OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import type { Settings, TicketData } from "../../types";

type UseLogin = () => {
  onSignIn: () => void,
  authUrl: string | null,
  error: null | string,
  isLoading: boolean,
};

const useLogin: UseLogin = () => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { context } = useDeskproLatestAppContext<TicketData, Settings>();
  const navigate = useNavigate();
  const spaceUrl = context?.settings?.space_url;
  const ticketId = context?.data?.ticket.id;

  useInitialisedDeskproAppClient(async (client) => {

    if (context?.settings.use_deskpro_saas === undefined || !ticketId) {
      // Make sure settings have loaded.
      return;
    }

    const clientId = context?.settings.client_id;
    const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

    if (mode === 'local' && typeof clientId !== 'string') {
      // Local mode requires a clientId.
      return;
    }

    const oauth2 =
      mode === 'local'
        // Local Version (custom/self-hosted app)
        ? await client.startOauth2Local(
          ({ state, callbackUrl }) => {
            return `${spaceUrl}/oauth/auth?${getQueryParams({
              response_type: "code",
              redirect_uri: callbackUrl,
              client_id: clientId ?? "",
              access_type: "offline",
              request_credentials: "default",
              state: state,
              scope: SCOPES.join(" "),
            })}`
          },
          /\bcode=(?<code>[^&#]+)/,
          async (code: string): Promise<OAuth2Result> => {
            // Extract the callback URL from the authorization URL
            const url = new URL(oauth2.authorizationUrl);
            const redirectUri = url.searchParams.get("redirect_uri");

            if (!redirectUri) {
              throw new Error("Failed to get callback URL");
            }

            const data = await getAccessTokenService(client, code, redirectUri)
            // const data = await getAccessTokenService(client, code);

            return { data }
          }
        )

        // Global Proxy Service
        : await client.startOauth2Global("C2CN2TBIOAZV6IC61BVL6LLQICE9CD8V");

    setAuthUrl(oauth2.authorizationUrl)
    setIsLoading(false)

    try {
      const result = await oauth2.poll()
      await Promise.all([
        setAccessTokenService(client, result.data.access_token),
        result.data.refresh_token ? setRefreshTokenService(client, result.data.refresh_token) : Promise.resolve(undefined)
      ])

      try {
        await getOrganizationService(client)
      } catch (e) {
        throw new Error("Failed to authenticate user")
      }

      const entityIds = await getEntityListService(client, String(ticketId))

      if (entityIds.length > 0) {
        navigate("/home")
      } else {
        navigate("/issues/link")
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      setIsLoading(false);
    }
  }, [setAuthUrl, context?.settings.client_id, context?.settings.use_deskpro_saas]);


  const onSignIn = useCallback(() => {
    setIsLoading(true);
    window.open(authUrl ?? "", '_blank');
  }, [setIsLoading, authUrl]);

  return { authUrl, onSignIn, error, isLoading };
};

export { useLogin };
