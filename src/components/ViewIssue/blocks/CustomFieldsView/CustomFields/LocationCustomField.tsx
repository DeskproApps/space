import { P5, Stack, IconV2 } from "@deskpro/deskpro-ui";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["LocationCFValue"];

const LocationCustomField: FC<Props> = ({ location }) => {
  if (!location?.name) {
    return (
      <NoValue/>
    );
  }
  return  (
    <Stack gap={6} align="center">
      <IconV2 icon="dazzle-solid-location-pin"/>
      <P5>{location.name}</P5>
    </Stack>
  );
};

export { LocationCustomField };
