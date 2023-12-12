import { createElement } from "react";
import { z } from "zod";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import difference from "lodash/difference";
import { Member } from "@deskpro/app-sdk";
import { getOption, getFullName } from "../../utils";
import { format, parse } from "../../utils/date";
import { DATE_ON } from "../../constants";
import { Status, Tag } from "../common";
import type { Maybe } from "../../types";
import type {
  Issue,
  IssueTag,
  IssueInput,
  IssueStatus,
  Member as MemberType,
} from "../../services/space/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  project: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  assignee: z.string().optional(),
  status: z.string().min(1),
  dueDate: z.date().optional(),
  tags: z.array(z.string()),
});

const getInitValues = (issue?: Maybe<Issue>): FormValidationSchema => {
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

const getIssueValues = (values: FormValidationSchema): IssueInput => {
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
    createElement(Tag, { tag }),
    tag.name,
  ));
};

const getIssueTagsToUpdate = (issue: Issue, values: FormValidationSchema): {
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
  getInitValues,
  getTagOptions,
  getIssueValues,
  validationSchema,
  getStatusOptions,
  getAssigneeOptions,
  getIssueTagsToUpdate,
};
