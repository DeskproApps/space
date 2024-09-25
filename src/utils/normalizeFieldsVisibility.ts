import type { FieldsVisibility, FieldVisibility } from "../services/space/types";

const normalizeFieldsVisibility = (
  fieldsVisibility?: FieldsVisibility,
): Record<FieldVisibility["field"], FieldVisibility["visible"]> => {
  return (Array.isArray(fieldsVisibility?.systemIssueFieldVisibilities)
    ? fieldsVisibility?.systemIssueFieldVisibilities ?? []
    : []
  ).reduce((acc, f) => {
    if (f.field) {
      acc[f.field] = f.visible;
    }
    return acc;
  }, {} as Record<FieldVisibility["field"], FieldVisibility["visible"]>);
};

export { normalizeFieldsVisibility };
