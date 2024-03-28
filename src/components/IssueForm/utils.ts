import { createElement } from "react";
import { P, match } from "ts-pattern";
import isDate from "date-fns/isDate";
import formatFNS from "date-fns/format";
import formatISO from "date-fns/formatISO";
import parseISO from "date-fns/parseISO";
import { z } from "zod";
import { get, map, size, find, reduce, isEmpty, difference } from "lodash";
import { v4 as uuid } from "uuid";
import { Member } from "@deskpro/app-sdk";
import { getOption, getFullName, getCommitIdentifier } from "../../utils";
import { format, parse } from "../../utils/date";
import { DATE_ON, CustomFieldsType } from "../../constants";
import { Status, Tag } from "../common";
import type { Maybe } from "../../types";
import type {
  Issue,
  Project,
  IssueTag,
  IssueInput,
  IssueStatus,
  CustomFieldData,
  Member as MemberType,
} from "../../services/space/types";
import type { FormValidationSchema, CustomFormValidationSchema } from "./types";

const validationSchema = z.object({
  project: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  assignee: z.string().optional(),
  status: z.string().min(1),
  dueDate: z.date().optional(),
  tags: z.array(z.string()),
});

const validationSchemaCustomForm = z.object({});

const getDefaultInitValues = (
  issue?: Maybe<Issue>,
): FormValidationSchema => {
  return {
    project: issue?.projectRef.id || "",
    title: issue?.title || "",
    description: issue?.description || "",
    assignee: get(issue, ["assignee", "id"]) || "",
    status: get(issue, ["status", "id"]) || "",
    dueDate: parse(get(issue, ["dueDate", "iso"])) || undefined,
    tags: map(issue?.tags, "id") || [],
  };
};

const getCustomInitValues = (
  issue?: Maybe<Issue>,
  meta?: CustomFieldData[],
): CustomFormValidationSchema => {
  const customFields = get(issue, ["customFields"], {}) || {};

  return reduce(customFields, (acc, fieldValue, fieldName) => {
    const customField = find(meta, { name: fieldName });

    const formValue = match(customField)
      .with(P.union(
        { type: CustomFieldsType.STRING, multivalued: false },
        { type: CustomFieldsType.INTEGER, multivalued: false },
        { type: CustomFieldsType.PERCENTAGE }
      ), () => {
        return get(fieldValue, ["value"]) || "";
      })
      .with(P.union(
        { type: CustomFieldsType.STRING, multivalued: true },
        { type: CustomFieldsType.INTEGER, multivalued: true },
      ), () => {
        const issueValue = get(fieldValue, ["values"]);
        return (Array.isArray(issueValue) ? issueValue : [])
          .map((value) => ({ id: uuid(), value }));
      })
      .with({ type: CustomFieldsType.ENUM, multivalued: false }, () => {
        return get(fieldValue, ["value"]) || null
      })
      .with({ type: CustomFieldsType.ENUM, multivalued: true }, () => {
        return get(fieldValue, ["values"]) || [];
      })
      .with({ type: CustomFieldsType.BOOLEAN }, () => {
        return Boolean(get(fieldValue, ["value"]));
      })
      .with(P.union(
        { type: CustomFieldsType.DATE },
        { type: CustomFieldsType.DATE_TIME },
      ), () => {
        const date = parseISO(get(fieldValue, ["value", "iso"]));
        return isDate(date) ? date : null;
      })
      .with({ type: CustomFieldsType.PROFILE, multivalued: false }, () => {
        return get(fieldValue, ["profile", "id"]) || null;
      })
      .with({ type: CustomFieldsType.PROFILE, multivalued: true }, () => {
        return map(get(fieldValue, ["profiles"], []), "id");
      })
      .with({ type: CustomFieldsType.TEAM }, () => {
        return get(fieldValue, ["team", "id"]) || null;
      })
      .with({ type: CustomFieldsType.LOCATION }, () => {
        return get(fieldValue, ["location", "id"]) || null;
      })
      .with({ type: CustomFieldsType.PROJECT }, () => {
        return get(fieldValue, ["project", "id"]) || null;
      })
      .with({ type: CustomFieldsType.URL }, () => {
        return get(fieldValue, ["href"]) || "";
      })
      .with({ type: CustomFieldsType.ISSUE, multivalued: false }, () => {
        return get(fieldValue, ["issue", "id"]) || "";
      })
      .with({ type: CustomFieldsType.ISSUE, multivalued: true }, () => {
        return map(get(fieldValue, ["issues"], []), "id");
      })
      .with({ type: CustomFieldsType.COMMIT, multivalued: false }, () => {
        const project = get(fieldValue, ["commit", "commit", "project", "id"]);
        const repo = get(fieldValue, ["commit", "commit", "repository"]);
        const hash = get(fieldValue, ["commit", "commit", "commitId"]);
        return (!project || !repo || !hash)
          ? null
          : `${project}/${repo}/${hash}`;
      })
      .otherwise(() => null);

    if (formValue) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[customField.id] = formValue;
    }

    return acc;
  }, {});
};

const getDefaultIssueValues = (
  values: FormValidationSchema,
): Omit<IssueInput, "customFields"> => {
  const dueDate = get(values, ["dueDate"]) || null;

  return {
    title: values.title,
    description: values.description,
    assignee: values.assignee,
    status: values.status,
    dueDate: !dueDate ? null : format(values.dueDate, DATE_ON),
    tags: values.tags || [],
  };
};

const getCustomIssueValues = (
  values: CustomFormValidationSchema,
  meta: CustomFieldData[],
): Pick<IssueInput, "customFields"> => {
  if (isEmpty(values) || !Array.isArray(meta) || !size(meta)) {
    return { customFields: [] };
  }

  return { customFields: map(values, (value, fieldId) => {
    const customField = find(meta, { id: fieldId });
    return match(customField)
      .with({ type: CustomFieldsType.STRING, multivalued: false }, () => ({
          fieldId, value: { className: "StringCFValue", value },
        }))
      .with({ type: CustomFieldsType.STRING, multivalued: true }, () => ({
          fieldId,
          value: {
            className: "StringListCFValue",
            values: (!Array.isArray(value) ? [] : value).map(({ value }) => value),
          }
        }))
      .with({ type: CustomFieldsType.INTEGER, multivalued: false }, () => ({
          fieldId, value: { className: "IntCFValue", value },
        }))
      .with({ type: CustomFieldsType.INTEGER, multivalued: true }, () => ({
          fieldId,
          value: {
            className: "IntListCFValue",
            values: (!Array.isArray(value) ? [] : value).map(({ value }) => value),
          },
        }))
      .with({ type: CustomFieldsType.ENUM, multivalued: false }, () => {
        const option = find(get(customField, ["parameters", "values"], []), { id: value });

        return !option ? undefined : {
          fieldId,
          value: { className: "EnumCFValue", value: option },
        };
      })
      .with({ type: CustomFieldsType.ENUM, multivalued: true }, () => ({
          fieldId,
          value: {
            className: "EnumListCFValue",
            values: value,
          },
        }))
      .with({ type: CustomFieldsType.BOOLEAN }, () => ({
        fieldId,
        value: {
          className: "BooleanCFValue",
          value: Boolean(value),
        },
      }))
      .with({ type: CustomFieldsType.DATE }, () => ({
          fieldId,
          value: {
            className: "DateCFValue",
            value: isDate(value) ? formatFNS(value, DATE_ON) : null,
          },
        }))
      .with({ type: CustomFieldsType.DATE_TIME }, () => ({
          fieldId,
          value: {
            className: "DateTimeCFValue",
            value: isDate(value) ? formatISO(value) : null,
          },
        }))
      .with({ type: CustomFieldsType.PERCENTAGE }, () => ({
          fieldId,
          value: { className: "PercentageCFValue", value: value },
        }))
      .with({ type: CustomFieldsType.PROFILE, multivalued: false }, () => ({
          fieldId,
          value: {
            className: "ProfileCFInputValue",
            profile: { className: "ProfileIdentifier.Id", id: value },
          },
        }))
      .with({ type: CustomFieldsType.PROFILE, multivalued: true }, () => ({
          fieldId,
          value: {
            className: "ProfileListCFInputValue",
            profiles: (Array.isArray(value) ? value : []).map((profileId) => ({
              className: "ProfileIdentifier.Id",
              id: profileId,
            })),
          },
        }))
      .with({ type: CustomFieldsType.TEAM }, () => ({
          fieldId,
          value: { className: "TeamCFInputValue", team: value },
        }))
      .with({ type: CustomFieldsType.LOCATION }, () => ({
          fieldId,
          value: { className: "LocationCFInputValue", location: value },
        }))
      .with({ type: CustomFieldsType.PROJECT }, () => ({
          fieldId,
          value: {
            className: "ProjectCFInputValue",
            project: { className: "ProjectIdentifier.Id", id: value },
          },
        }))
      .with({ type: CustomFieldsType.URL }, () => ({
          fieldId,
          value: { className: "UrlCFValue", href: value },
        }))
      .with({ type: CustomFieldsType.ISSUE, multivalued: false }, () => ({
          fieldId,
          value: {
            className: "IssueCFInputValue",
            issue: { className: "IssueIdentifier.Id", id: value },
          },
        }))
      .with({ type: CustomFieldsType.ISSUE, multivalued: true }, () => ({
          fieldId,
          value: {
            className: "IssueListCFInputValue",
            issues: (Array.isArray(value) ? value : []).map((issueId) => ({
              className: "IssueIdentifier.Id",
              id: issueId,
            })),
          },
        }))
      .with({ type: CustomFieldsType.COMMIT, multivalued: false }, () => ({
          fieldId,
          value: {
            className: "VcsCommitCFInputValue",
            commit: getCommitIdentifier(value),
          },
        }))
      .with({ type: CustomFieldsType.COMMIT, multivalued: true }, () => ({
        fieldId,
        value: {
          className: "VcsCommitListCFInputValue",
          commits: (Array.isArray(value) ? value : []).map(getCommitIdentifier).filter(Boolean),
        },
      }))
      .otherwise(() => null);
    }).filter(Boolean) as IssueInput["customFields"],
  };
};

const getProjectFromValues = (values: FormValidationSchema): Project["id"] => {
  return values.project;
};

const getAssigneeOptions = (members?: MemberType[]) => {
  if (!Array.isArray(members) || !size(members)) {
    return [];
  }

  return members.map((member) => {
    const label = createElement(Member, {
      key: member.id,
      name: getFullName(member),
      avatarUrl: get(member, ["avatarUrl"]),
    });
    return getOption(member.id, label, getFullName(member));
  });
};

const getStatusOptions = (statuses?: IssueStatus[]) => {
  if (!Array.isArray(statuses) || !size(statuses)) {
    return [];
  }

  return statuses.map((status) => getOption(
    status.id,
    createElement(Status, { status }),
    status.name,
  ));
};

const getTagOptions = (tags?: IssueTag[]) => {
  if (!Array.isArray(tags) || !size(tags)) {
    return [];
  }

  return tags.map((tag) => getOption(
    tag.id,
    createElement(Tag, { tag, key: tag.id }),
    tag.name,
  ));
};

const getIssueTagsToUpdate = (issue: Issue, values: IssueInput): {
  add: Array<IssueTag["id"]>,
  rem: Array<IssueTag["id"]>,
} => {
  const issueTags = map(get(issue, ["tags"], []) || [], "id");
  const newTags = values.tags || [];

  return {
    add: difference(newTags, issueTags),
    rem: difference(issueTags, newTags),
  };
};

export {
  getTagOptions,
  validationSchema,
  getStatusOptions,
  getAssigneeOptions,
  getCustomInitValues,
  getDefaultInitValues,
  getProjectFromValues,
  getCustomIssueValues,
  getIssueTagsToUpdate,
  getDefaultIssueValues,
  validationSchemaCustomForm,
};
