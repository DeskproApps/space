import { match } from "ts-pattern";
import {
  UrlCustomField,
  EnumCustomField,
  DateCustomField,
  TeamCustomField,
  IssueCustomField,
  StringCustomField,
  NumberCustomField,
  CommitCustomField,
  BooleanCustomField,
  ProjectCustomField,
  ProfileCustomField,
  DateTimeCustomField,
  LocationCustomField,
  EnumMultiCustomField,
  PercentageCustomField,
  StringMultiCustomField,
  NumberMultiCustomField,
  CommitMultiCustomField,
} from "./fields";
import { CustomFieldsType } from "../../../constants";
import type { CustomFieldData } from "../../../services/space/types";

const map = (field: CustomFieldData) => {
  return match(field)
    .with({ type: CustomFieldsType.STRING, multivalued: false }, () => StringCustomField)
    .with({ type: CustomFieldsType.STRING, multivalued: true }, () => StringMultiCustomField)
    .with({ type: CustomFieldsType.INTEGER, multivalued: false }, () => NumberCustomField)
    .with({ type: CustomFieldsType.INTEGER, multivalued: true }, () => NumberMultiCustomField)
    .with({ type: CustomFieldsType.ENUM, multivalued: false }, () => EnumCustomField)
    .with({ type: CustomFieldsType.ENUM, multivalued: true }, () => EnumMultiCustomField)
    .with({ type: CustomFieldsType.BOOLEAN }, () => BooleanCustomField)
    .with({ type: CustomFieldsType.DATE }, () => DateCustomField)
    .with({ type: CustomFieldsType.DATE_TIME }, () => DateTimeCustomField)
    .with({ type: CustomFieldsType.PERCENTAGE }, () => PercentageCustomField)
    .with({ type: CustomFieldsType.PROFILE }, () => ProfileCustomField)
    .with({ type: CustomFieldsType.TEAM }, () => TeamCustomField)
    .with({ type: CustomFieldsType.LOCATION }, () => LocationCustomField)
    .with({ type: CustomFieldsType.PROJECT }, () => ProjectCustomField)
    .with({ type: CustomFieldsType.URL }, () => UrlCustomField)
    .with({ type: CustomFieldsType.ISSUE }, () => IssueCustomField)
    .with({ type: CustomFieldsType.COMMIT, multivalued: false }, () => CommitCustomField)
    .with({ type: CustomFieldsType.COMMIT, multivalued: true }, () => CommitMultiCustomField)
    .with({ type: CustomFieldsType.AUTONUMBER }, () => null)
    .otherwise(() => null);
};

export { map };
