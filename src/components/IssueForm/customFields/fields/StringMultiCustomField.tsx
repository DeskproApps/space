import { useState } from "react";
import { size, filter } from "lodash-es";
import { v4 as uuid } from "uuid";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDebouncedCallback } from "use-debounce";
import { P5, Stack, Input, IconButton } from "@deskpro/deskpro-ui";
import { Overflow } from "../../../common";
import type { ChangeEvent, FC, KeyboardEvent } from "react";
import type { CustomFieldProps } from "../../types";

const StringMultiCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;
  const [stringValue, setStringValue] = useState<string>("");

  const onAddValueToForm = () => {
    if (stringValue) {
      formControlField.onChange([
        ...formControlField.value || [],
        { id: uuid(), value: stringValue.trim() },
      ]);
      setStringValue("");
    }
  };

  const onRemoveValueFromForm = useDebouncedCallback((removeId) => {
    const newValue = filter(formControlField.value, ({ id }) => id != removeId);
    formControlField.onChange(newValue);
  }, 100);

  return (
    <>
      {Array.isArray(formControlField.value) && Boolean(size(formControlField.value)) && (
        formControlField.value.map(({ id, value }) => (
          <Stack key={id} align="center">
            <Overflow as={P5}>{value}</Overflow>
            <IconButton
              minimal
              icon={faTimes}
              color="grey40"
              onClick={() => onRemoveValueFromForm(id)}
            />
          </Stack>
        )))
      }
      <Input
        type="text"
        variant="inline"
        inputsize="small"
        placeholder="Add value"
        value={stringValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setStringValue(e.target.value)}
        onKeyDown={(e: KeyboardEvent) => ((e.key === 'Enter') && onAddValueToForm())}
        style={{ paddingRight: 0 }}
        rightIcon={
          <IconButton
            minimal
            icon={faPlus}
            color="grey40"
            onClick={onAddValueToForm}
          />
        }
      />
    </>
  );
};

export { StringMultiCustomField };
