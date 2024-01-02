import { DateInput } from "@deskpro/app-sdk";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const DateTimeCustomField: FC<CustomFieldProps> = ({ field, formControl }) => {
  const { field: formControlField } = formControl;

  return (
    <DateInput
      id={field.id}
      error={false}
      enableTime
      placeholder="DD/MM/YYYY"
      value={formControlField.value as Date}
      onChange={(date: [Date]) => formControlField.onChange(date[0])}
    />
  );
};

export { DateTimeCustomField };
