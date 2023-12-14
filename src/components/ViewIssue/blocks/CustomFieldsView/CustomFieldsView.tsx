import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { Property } from "@deskpro/app-sdk";
import { CustomField } from "./CustomField";
import type { FC } from "react";
import type { Issue } from "../../../../services/space/types";

type Props = {
  fields?: Issue["customFields"],
};

const CustomFieldsView: FC<Props> = ({ fields = [] }) => {
  if (isEmpty(fields)) {
    return (<></>);
  }

  return (
    <>
      {map(fields, (field, key) => (
        <Property
          key={key}
          label={key}
          text={<CustomField field={field} />}
        />
      ))}
    </>
  );
};

export { CustomFieldsView };
