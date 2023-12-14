import { P5 } from "@deskpro/deskpro-ui";
import { format } from "../../../../../utils/date";
import { DATE_FORMAT, TIME_FORMAT } from "../../../../../constants";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";
import type { DateOn } from "../../../../../services/space/types";

type Props = Omit<components["schemas"]["DateTimeCFValue"], "value"> & {
  value?: DateOn,
};

const DateTimeCustomField: FC<Props> = ({ value }) => (
  <P5>{format(value?.iso, `${DATE_FORMAT} ${TIME_FORMAT}`)}</P5>
);

export { DateTimeCustomField };
