import { useState } from "react";
import { size, filter } from "lodash-es";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDebouncedCallback } from "use-debounce";
import { P5, Stack, Input, IconButton } from "@deskpro/deskpro-ui";
import type { ChangeEvent, FC, KeyboardEvent } from "react";
import type { CustomFieldProps } from "../../types";

const Container = styled.div`
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

const NumberMultiCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;
  const [numberValue, setNumberValue] = useState<string>("");

  const onAddValueToForm = () => {
    if (numberValue) {
      formControlField.onChange([
        ...formControlField.value || [],
        { id: uuidv4(), value: numberValue.trim() },
      ]);
      setNumberValue("");
    }
  };

  const onRemoveValueFromForm = useDebouncedCallback((removeId) => {
    const newValue = filter(formControlField.value, ({ id }) => id != removeId);
    formControlField.onChange(newValue);
  }, 100);

  return (
    <Container>
      {Array.isArray(formControlField.value) && Boolean(size(formControlField.value)) && (
        formControlField.value.map(({ id, value }) => (
          <Stack key={id} align="center">
            <P5>{value}</P5>
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
        type="number"
        variant="inline"
        inputsize="small"
        placeholder="Add value"
        value={numberValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNumberValue(e.target.value)}
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
    </Container>
  );
};

export { NumberMultiCustomField };
