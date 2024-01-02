import { Input } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const NumberCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;

  return (
    <Input
      type="number"
      variant="inline"
      inputsize="small"
      placeholder="Add value"
      {...formControlField}
    />
  );
};

export { NumberCustomField };
