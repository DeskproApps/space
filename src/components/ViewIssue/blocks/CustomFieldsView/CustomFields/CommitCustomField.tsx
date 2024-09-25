import { truncate } from "lodash-es";
import { P5, Stack, IconV2 } from "@deskpro/deskpro-ui";
import { Overflow } from "../../../../common";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { CFCommit } from "../../../../../services/space/types";

type Props = CFCommit;

const CommitCustomField: FC<Props> = ({ commit }) => {
  const hash = commit?.commit?.commitId;
  const message = commit?.commit?.message;

  if (!hash || !message) {
    return (
      <NoValue/>
    );
  }

  return (
    <Stack gap={6} align="center">
      <IconV2 icon="dazzle-linear-merge"/>
      <P5>{truncate(hash, { length: 7, omission: "" })}</P5>
      <Overflow as={P5}>{message}</Overflow>
    </Stack>
  );
};

export { CommitCustomField };
