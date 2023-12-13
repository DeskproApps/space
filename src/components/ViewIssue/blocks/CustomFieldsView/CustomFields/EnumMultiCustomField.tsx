import map from "lodash/map";
import size from "lodash/size";
import { P5 } from "@deskpro/deskpro-ui";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["EnumListCFType"];

const EnumMultiCustomField: FC<Props> = ({ values }) => {
  if (!Array.isArray(values) || !size(values)) {
    return (<NoValue/>);
  }

  return (
    <P5>{map(values, "value").join(", ")}</P5>
  );
};

export { EnumMultiCustomField };
