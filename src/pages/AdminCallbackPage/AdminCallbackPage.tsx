import { getQueryParams } from "../../utils";
import { P1 } from "@deskpro/deskpro-ui";
import { SCOPES } from "../../constants";
import { useState } from "react";
import { CopyToClipboardInput, LoadingSpinner, OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import styled from "styled-components";
import type { FC } from "react";
import type { Maybe } from "../../types";

export type Props = { callbackUrl?: Maybe<string> };

const Description = styled(P1)`
  margin-top: 8px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.grey80};
`;

export const AdminCallback: FC<Props> = ({ callbackUrl }) => {
  if (!callbackUrl) {
    return (<LoadingSpinner />);
  }

  return (
    <>
      <CopyToClipboardInput value={callbackUrl} />
      <Description>The callback URL will be required during Space app setup</Description>
    </>
  );
};

const AdminCallbackPage: FC = () => {
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const { context } = useDeskproLatestAppContext<{ ticket: { id: number } }, { client_id: string, space_url: string }>();

  const spaceUrl = context?.settings?.space_url;

  useInitialisedDeskproAppClient(async (client) => {
    const oauth2 = await client.startOauth2Local(
      ({ callbackUrl, state }) => {
        return `${spaceUrl}/oauth/auth?${getQueryParams({
          response_type: "code",
          redirect_uri: callbackUrl,
          client_id: "xxx",
          access_type: "offline",
          request_credentials: "default",
          state: state,
          scope: SCOPES.join(" "),
        })}`
      },
      /code=(?<code>[0-9a-f]+)/,
      async (): Promise<OAuth2Result> => ({ data: { access_token: "", refresh_token: "" } })
    );

    const url = new URL(oauth2.authorizationUrl);
    const redirectUri = url.searchParams.get("redirect_uri");

    if (redirectUri) {
      setCallbackUrl(redirectUri);
    }
  });

  return (
    <AdminCallback callbackUrl={callbackUrl} />
  );
};

export { AdminCallbackPage };
