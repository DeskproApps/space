import { useMemo, useCallback } from "react";
import get from "lodash/get";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import { Select } from "@deskpro/app-sdk";
import { getOptions } from "../../../../utils";
import type { FC } from "react";
import type { components } from "../../../../services/space/types";
import type { CustomFieldProps } from "../../types";

type EnumValue = components["schemas"]["CFEnumValue"];

const EnumMultiCustomField: FC<CustomFieldProps> = ({ field, formControl }) => {
  const { field: formControlField } = formControl;
  const items: EnumValue[] = useMemo(() => {
    return get(field, ["parameters", "values"], []) || [];
  }, [field]);
  const options = getOptions(items, "value");
  const value = !Array.isArray(formControlField.value) ? [] : formControlField.value;

  const onChange = useCallback((value: Array<EnumValue["id"]>) => {
    const newValue = !Array.isArray(value) ? [] : value.map((id) => {
      const item = items.find((item) => item.id === id);
      return isEmpty(item) ? null : pick(item, ["id", "value"]);
    });
    formControlField.onChange(newValue);
  }, [formControlField, items]);

  return (
    <Select
      id={field.id}
      initValue={value.map(({ id }) => id)}
      options={options}
      closeOnSelect={false}
      onChange={onChange as never}
    />
  );
};

export { EnumMultiCustomField };
