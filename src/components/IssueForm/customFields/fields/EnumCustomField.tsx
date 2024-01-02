import { useMemo } from "react";
import get from "lodash/get";
import { Select } from "@deskpro/app-sdk";
import { getOptions } from "../../../../utils";
import type { FC } from "react";
import type { components } from "../../../../services/space/types";
import type { CustomFieldProps } from "../../types";

type EnumValue = components["schemas"]["CFEnumValue"];

const EnumCustomField: FC<CustomFieldProps> = ({ field, formControl }) => {
  const { field: formControlField } = formControl;
  const items: EnumValue[] = useMemo(() => {
    return get(field, ["parameters", "values"], []) || [];
  }, [field]);
  const options = getOptions(items, "value");
  const value = get(formControlField, ["value", "id"]) || "";

  return (
    <Select
      id={field.id}
      initValue={value}
      options={options}
      onChange={formControlField.onChange}
    />
  );
};

export { EnumCustomField };
