import { useMemo } from "react";
import get from "lodash/get";
import find from "lodash/find";
import { Select, useQueryWithClient } from "@deskpro/app-sdk";
import { getProjectsService } from "../../../../services/space";
import { QueryKey } from "../../../../query";
import { getAssigneeOptions } from "../../utils";
import { getProjectMembers } from "../../../../utils";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const ProfileCustomField: FC<CustomFieldProps> = ({ field, formControl, projectId }) => {
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  const assigneeOptions = useMemo(() => {
    const project = find(get(projects.data, ["data"]), { id: projectId });
    const members = getProjectMembers(project);

    return getAssigneeOptions(members);
  }, [projects.data, projectId]);

  const { field: formControlField } = formControl;
  const isMulti = get(field, ["multivalued"]);
  const value = isMulti
    ? (!Array.isArray(formControlField.value) ? [] : formControlField.value)
    : (formControlField.value || "");

  return (
    <Select
      id={field.id}
      initValue={value}
      options={assigneeOptions}
      closeOnSelect={!isMulti}
      onChange={formControlField.onChange}
    />
  );
};

export { ProfileCustomField };
