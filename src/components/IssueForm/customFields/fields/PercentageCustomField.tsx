import { Input } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const PercentageCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;

  return (
    <Input
      type="number"
      min="0"
      max="100"
      variant="inline"
      inputsize="small"
      placeholder="Add value"
      {...formControlField}
    />
  );
};

export { PercentageCustomField };
