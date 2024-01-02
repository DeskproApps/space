import { baseRequest } from "./baseRequest";
import { fields } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Location } from "./types";

const getLocationsService = (client: IDeskproClient) => {
  return baseRequest<Location[]>(client, {
    url: "/team-directory/locations",
    queryParams: {
      $fields: fields.LOCATION,
    },
  });
};

export { getLocationsService };
