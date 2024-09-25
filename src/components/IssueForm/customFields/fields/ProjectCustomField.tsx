import { useMemo } from "react";
import {Select, useQueryWithClient} from "@deskpro/app-sdk";
import { getProjectsService } from "../../../../services/space";
import { QueryKey } from "../../../../query";
import { getOptions } from "../../../../utils";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const ProjectCustomField: FC<CustomFieldProps> = ({ field, formControl }) => {
  const { field: formControlField } = formControl;
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);
  const options = useMemo(() => getOptions(projects.data?.data), [projects.data]);

  return (
    <Select
      id={field.id}
      initValue={formControlField.value || ""}
      options={options}
      onChange={formControlField.onChange}
    />
  );
};

export { ProjectCustomField };
