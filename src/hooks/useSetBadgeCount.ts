import { size } from "lodash-es";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";

const useSetBadgeCount = <T>(items: Array<T>) => {
  useInitialisedDeskproAppClient((client) => {
    if (!Array.isArray(items)) {
      return;
    }

    client.setBadgeCount(size(items));
  }, [items]);
};

export { useSetBadgeCount };
