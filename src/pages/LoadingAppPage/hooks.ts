import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { getOrganizationService, refreshAccessTokenService } from "../../services/space";

type UseCheckAuth = () => void;

const useCheckAuth: UseCheckAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext<{ ticket: { id: number } }, { client_id: string, space_url: string }>();
  const ticketId = context?.data?.ticket.id;

  useInitialisedDeskproAppClient((client) => {
    if (!ticketId) {
      return;
    }

    getOrganizationService(client)
      .catch(() =>
        refreshAccessTokenService(client).then(() => getOrganizationService(client))
      )
      .then(() => getEntityListService(client, String(ticketId)))
      .then((entityIds) => navigate(entityIds?.length ? "/home" : "/issues/link"))
      .catch(() => navigate("/login"))
  }, [navigate, ticketId]);
};

export { useCheckAuth };
