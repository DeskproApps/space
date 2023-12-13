import { P5 } from "@deskpro/deskpro-ui";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["EnumCFValue"];

const EnumCustomField: FC<Props> = (props) => {
  return !props.value?.value
    ? (<NoValue/>)
    : (<P5>{props.value?.value}</P5>)
};

export { EnumCustomField };
