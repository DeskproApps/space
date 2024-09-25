import { isNull } from "lodash-es";
import { map } from "./map";
import { NoValue } from "./CustomFields";
import type { FC } from "react";
import type { CustomField as CustomFieldType } from "../../../../services/space/types";

type Props = { field: CustomFieldType };

const CustomField: FC<Props> = (props) => {
  const customField = props.field;
  const field = map(customField);

  if (isNull(field)) {
    // eslint-disable-next-line no-console
    console.warn(`Could not render field view, mapping missing for Space field type ${customField.className}`);
    return (<NoValue />)
  }

  return (
    <>{field}</>
  );
};

export { CustomField };
