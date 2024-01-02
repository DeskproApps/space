import { useMemo } from "react";
import get from "lodash/get";
import { Select, useQueryWithClient } from "@deskpro/app-sdk";
import { searchIssuesService } from "../../../../services/space";
import { QueryKey } from "../../../../query";
import { getOptions } from "../../../../utils";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const IssueCustomField: FC<CustomFieldProps> = ({ field, formControl, projectId }) => {
  const { field: formControlField } = formControl;
  const { data } = useQueryWithClient(
    [QueryKey.ISSUES, projectId],
    (client) => searchIssuesService(client, projectId),
    { enabled: Boolean(projectId) },
  );
  const options = useMemo(() => getOptions(data?.data, "title"), [data]);
  const isMulti = get(field, ["multivalued"]);
  const value = isMulti
    ? (!Array.isArray(formControlField.value) ? [] : formControlField.value)
    : (formControlField.value || "");

  return (
    <Select
      id={field.id}
      initValue={value}
      options={options}
      showInternalSearch
      closeOnSelect={!isMulti}
      onChange={formControlField.onChange}
    />
  );
};

export { IssueCustomField };
