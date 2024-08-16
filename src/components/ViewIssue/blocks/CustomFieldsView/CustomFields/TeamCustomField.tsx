import { P5, Stack, IconV2 } from "@deskpro/deskpro-ui";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["TeamCFValue"];

const TeamCustomField: FC<Props> = ({ team }) => {
  const name = team?.name;

  if (!name) {
    return (
      <NoValue/>
    );
  }

  return (
    <Stack gap={6} align="center">
      <IconV2 icon="dazzle-solid-users"/>
      <P5>{name}</P5>
    </Stack>
  );
};

export { TeamCustomField };
