import React from "react";
import { match, P } from "ts-pattern";
import {
  UrlCustomField,
  DateCustomField,
  TeamCustomField,
  EnumCustomField,
  IssueCustomField,
  CommitCustomField,
  ProjectCustomField,
  ProfileCustomField,
  CheckboxCustomField,
  DateTimeCustomField,
  LocationCustomField,
  EnumMultiCustomField,
  PercentageCustomField,
  IssueMultiCustomField,
  SimpleMultiCustomField,
  CommitMultiCustomField,
  SimpleSingleCustomField,
  ProfileMultiCustomField,
} from "./CustomFields";
import { CustomFieldsMap } from "../../../../constants";
import type { ReactNode } from "react";
import type { Maybe } from "../../../../types";
import type { components } from "../../../../services/space/schema";
import type { Issue, CustomField, DateAt, DateOn } from "../../../../services/space/types";

const map = ({ className, ...props }: CustomField): ReactNode => {
  return match(className)
    .with(P.union(
      CustomFieldsMap.IntCFValue,
      CustomFieldsMap.StringCFValue,
      CustomFieldsMap.AutonumberCFValue,
    ), () => (
      <SimpleSingleCustomField {...props as { value: string }}/>
    ))
    .with(P.union(
      CustomFieldsMap.StringListCFValue,
      CustomFieldsMap.IntListCFValue,
    ), () => (
      <SimpleMultiCustomField {...props as components["schemas"]["StringListCFValue"]}/>
    ))
    .with(CustomFieldsMap.EnumCFValue, () => (
      <EnumCustomField {...props as components["schemas"]["EnumCFValue"]}/>
    ))
    .with(CustomFieldsMap.EnumListCFValue, () => (
      <EnumMultiCustomField {...props as components["schemas"]["EnumListCFValue"]}/>
    ))
    .with(CustomFieldsMap.BooleanCFValue, () => (
      <CheckboxCustomField {...props as components["schemas"]["BooleanCFValue"]}/>
    ))
    .with(CustomFieldsMap.DateCFValue, () => (
      <DateCustomField {...props as Omit<components["schemas"]["DateCFValue"], "value"> & { value?: DateAt } }/>
    ))
    .with(CustomFieldsMap.DateTimeCFValue, () => (
      <DateTimeCustomField {...props as Omit<components["schemas"]["DateTimeCFValue"], "value"> & { value?: DateOn }}/>
    ))
    .with(CustomFieldsMap.PercentageCFValue, () => (
      <PercentageCustomField {...props as components["schemas"]["PercentageCFValue"]}/>
    ))
    .with(CustomFieldsMap.ProfileCFValue, () => (
      <ProfileCustomField {...props as components["schemas"]["ProfileCFValue"]}/>
    ))
    .with(CustomFieldsMap.ProfileListCFValue, () => (
      <ProfileMultiCustomField {...props as components["schemas"]["ProfileListCFValue"]}/>
    ))
    .with(CustomFieldsMap.TeamCFValue, () => (
      <TeamCustomField {...props as components["schemas"]["TeamCFValue"]}/>
    ))
    .with(CustomFieldsMap.LocationCFValue, () => (
      <LocationCustomField {...props as components["schemas"]["LocationCFValue"]}/>
    ))
    .with(CustomFieldsMap.ProjectCFValue, () => (
      <ProjectCustomField {...props as components["schemas"]["ProjectCFValue"]}/>
    ))
    .with(CustomFieldsMap.UrlCFValue, () => (
      <UrlCustomField {...props as components["schemas"]["UrlCFValue"]}/>
    ))
    .with(CustomFieldsMap.IssueCFValue, () => (
      <IssueCustomField {...props as Omit<components["schemas"]["IssueCFValue"], "issue"> & { issue: Maybe<Issue> }}/>
    ))
    .with(CustomFieldsMap.IssueListCFValue, () => (
      <IssueMultiCustomField {...props as Omit<components["schemas"]["IssueListCFValue"], "issues"> & { issues: Maybe<Issue[]> }}/>
    ))
    .with(CustomFieldsMap.VcsCommitCFValue, () => (
      <CommitCustomField {...props as components["schemas"]["VcsCommitCFValue"]}/>
    ))
    .with(CustomFieldsMap.VcsCommitListCFValue, () => (
      <CommitMultiCustomField {...props as components["schemas"]["VcsCommitListCFValue"]}/>
    ))
    .otherwise(() => null);
}

export { map };
