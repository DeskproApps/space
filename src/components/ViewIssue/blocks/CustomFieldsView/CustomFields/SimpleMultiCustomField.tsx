import size from "lodash/size";
import { P5 } from "@deskpro/deskpro-ui";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props =
  |components["schemas"]["StringListCFValue"]
  |components["schemas"]["IntListCFValue"];

const SimpleMultiCustomField: FC<Props> = ({ values }) => {
  return (
    <>
      {(!Array.isArray(values) || !size(values))
        ? <NoValue/>
        : values?.map((value, index) => (
          <P5 key={index}>{value}</P5>
        ))}
    </>
  )
};

export { SimpleMultiCustomField };
