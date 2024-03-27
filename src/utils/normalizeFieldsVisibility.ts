import reduce from "lodash/reduce";
import get from "lodash/get";
import type { FieldsVisibility, FieldVisibility } from "../services/space/types";

const normalizeFieldsVisibility = (
  fieldsVisibility?: FieldsVisibility,
): Record<FieldVisibility["field"], FieldVisibility["visible"]> => {
  return reduce(get(fieldsVisibility, ["systemIssueFieldVisibilities"]), (acc, f) => {
    if (f.field) {
      acc[f.field] = f.visible;
    }
    return acc;
  }, {} as Record<FieldVisibility["field"], FieldVisibility["visible"]>);
};

export { normalizeFieldsVisibility };
