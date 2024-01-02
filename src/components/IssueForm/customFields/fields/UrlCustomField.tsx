import { Input } from "@deskpro/deskpro-ui";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const UrlCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;

  return (
    <Input
      type="text"
      variant="inline"
      inputsize="small"
      placeholder="Add value"
      {...formControlField}
    />
  );
};

export { UrlCustomField };
