import { Toggle } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const BooleanCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;

  return (
    <Toggle
      checked={Boolean(formControlField.value)}
      onChange={() => formControlField.onChange(!formControlField.value)}
    />
  );
};

export { BooleanCustomField };
