import { P5 } from "@deskpro/deskpro-ui";
import { format } from "../../../../../utils/date";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";
import type { DateAt } from "../../../../../services/space/types";

type Props = Omit<components["schemas"]["DateCFValue"], "value"> & {
  value?: DateAt,
};

const DateCustomField: FC<Props> = ({ value }) => (
  <P5>{format(value?.iso)}</P5>
);

export { DateCustomField };
