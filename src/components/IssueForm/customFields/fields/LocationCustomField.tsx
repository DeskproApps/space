import { useMemo } from "react";
import { Select, useQueryWithClient } from "@deskpro/app-sdk";
import { getLocationsService } from "../../../../services/space";
import { QueryKey } from "../../../../query";
import { getOptions } from "../../../../utils";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const LocationCustomField: FC<CustomFieldProps> = ({ field, formControl }) => {
  const { field: formControlField } = formControl;
  const locations = useQueryWithClient([QueryKey.LOCATION], getLocationsService);
  const options = useMemo(() => getOptions(locations.data || []), [locations.data])

  return (
    <Select
      id={field.id}
      initValue={formControlField.value || ""}
      options={options}
      onChange={formControlField.onChange}
    />
  );
};

export { LocationCustomField };
