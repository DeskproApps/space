import get from "lodash/get";
import isNil from "lodash/isNil";
import { Controller } from "react-hook-form";
import { map } from "./map";
import { CustomFieldsType } from "../../../constants";
import { Label } from "../../common";
import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { CustomFieldData, Project } from "../../../services/space/types";
import type { CustomFormValidationSchema } from "../types";

type Props = {
  projectId: Project["id"],
  control: Control<CustomFormValidationSchema>,
  customFields: CustomFieldData[],
};

const CustomFields: FC<Props> = ({ control, customFields, projectId }) => (
  <>
    {customFields.map((field) => {
      const fieldId = get(field, ["id"]);
      const fieldName = get(field, ["name"]);
      const CustomField = map(field);

      if (isNil(CustomField)) {
        if (get(field, ["type"]) !== CustomFieldsType.AUTONUMBER) {
          // eslint-disable-next-line no-console
          console.warn(`Could not render field view, mapping missing for Space field type ${get(field, ["type"])}`);
        }
        return null;
      }

      const customField = (
        <Controller
          name={fieldId as never}
          control={control}
          render={(formControl) => (
            <CustomField field={field} formControl={formControl as never} projectId={projectId}/>
          )}
        />
      );

      return (
        <Label
          renderAs="div"
          key={fieldId}
          id={fieldId}
          label={fieldName}
          required={field.required}
        >
          {customField}
        </Label>
      );
    })}
  </>
);

export { CustomFields };
