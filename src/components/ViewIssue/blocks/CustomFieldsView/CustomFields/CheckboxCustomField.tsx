import { noop } from "lodash-es";
import { Toggle } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["BooleanCFValue"];

const CheckboxCustomField: FC<Props> = ({ value }) => (
  <Toggle checked={Boolean(value)} onChange={noop}/>
);

export { CheckboxCustomField };
