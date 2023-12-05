import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";

const useSetTitle = (title: string): void => {
  useInitialisedDeskproAppClient((client) => {
    client.setTitle(title || "Space");
  }, [title]);
};

export { useSetTitle };
