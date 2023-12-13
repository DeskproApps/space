import React from "react";
import { P5 } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { Maybe } from "../../../../../types";

type Props = { text?: Maybe<string> };

const NoValue: FC<Props> = ({ text }) => (
  <P5>{!text ? "-" : text}</P5>
);

export { NoValue };
