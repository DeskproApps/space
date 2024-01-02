import { P5 } from "@deskpro/deskpro-ui";
import { NoValue } from "./NoValue";
import { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props =
  |components["schemas"]["StringCFValue"]
  |components["schemas"]["IntCFValue"]
  |components["schemas"]["AutonumberCFValue"]
;

const SimpleSingleCustomField: FC<Props> = ({ value }) => {
  return !value ? <NoValue/> : <P5>{value}</P5>;
};

export { SimpleSingleCustomField };
