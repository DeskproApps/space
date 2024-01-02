import { useMemo } from "react";
import get from "lodash/get";
import { Select, useQueryWithClient } from "@deskpro/app-sdk";
import { getTeamsService } from "../../../../services/space";
import { getOptions } from "../../../../utils";
import { QueryKey } from "../../../../query";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const TeamCustomField: FC<CustomFieldProps> = ({ formControl }) => {
  const { field: formControlField } = formControl;
  const teams = useQueryWithClient([QueryKey.TEAM], getTeamsService)
  const options = useMemo(() =>  getOptions(get(teams.data, ["data"])), [teams.data]);

  return (
    <Select
      initValue={formControlField.value || ""}
      options={options}
      onChange={formControlField.onChange}
    />
  );
};

export { TeamCustomField };
