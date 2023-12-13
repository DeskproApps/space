import { P5 } from "@deskpro/deskpro-ui";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["PercentageCFValue"];

const PercentageCustomField: FC<Props> = ({ value }) => (
  !value ? (<NoValue/>) : (<P5>{value}%</P5>)
);

export { PercentageCustomField };
