import { useMemo } from "react";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getTagsService,
  getProjectsService,
  getIssueStatusesService,
  getFieldsVisibilityService,
  getCustomFieldsConfigService,
} from "../../../services/space";
import { QueryKey } from "../../../query";
import {
  getOptions,
  getProjectMembers,
  normalizeFieldsVisibility,
} from "../../../utils";
import { getAssigneeOptions, getStatusOptions, getTagOptions } from "../utils";
import type { Option } from "../../../types";
import type {
  Member,
  Project,
  IssueTag,
  IssueStatus,
  FieldVisibility,
  CustomFieldData,
} from "../../../services/space/types";

type UseFormDeps = (projectId?: Project["id"]) => {
  isLoading: boolean,
  projectOptions: Array<Option<Project["id"]>>,
  assigneeOptions: Array<Option<Member["id"]>>,
  statusOptions: Array<Option<IssueStatus["id"]>>,
  tagOptions: Array<Option<IssueTag["id"]>>,
  customFields: CustomFieldData[],
  visibility: Record<FieldVisibility["field"], FieldVisibility["visible"]>,
};

const useFormDeps: UseFormDeps = (projectId) => {
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  const fieldsVisibility = useQueryWithClient(
    [QueryKey.FIELDS_VISIBILITY, projectId as Project["id"]],
    (client) => getFieldsVisibilityService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const visibility = useMemo(() => {
    return normalizeFieldsVisibility(fieldsVisibility.data);
  }, [fieldsVisibility.data]);

  const statuses = useQueryWithClient(
    [QueryKey.ISSUE_STATUSES, projectId as Project["id"]],
    (client) => getIssueStatusesService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const tags = useQueryWithClient(
    [QueryKey.ISSUE_TAGS, projectId as Project["id"]],
    (client) => getTagsService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const customFields = useQueryWithClient(
    [QueryKey.CUSTOM_FIELDS, projectId as Project["id"]],
    (client) => getCustomFieldsConfigService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) },
  );

  const projectOptions = useMemo(() => getOptions(projects.data?.data), [projects.data]);

  const assigneeOptions = useMemo(() => {
    const project = (Array.isArray(projects.data?.data) ? projects.data?.data ?? [] : [])
      .find(({ id }) => projectId === id);
    const members = getProjectMembers(project);

    return getAssigneeOptions(members);
  }, [projects.data, projectId]);

  const statusOptions = useMemo(() => getStatusOptions(statuses.data), [statuses.data]);

  const tagOptions = useMemo(() => getTagOptions(tags.data?.data), [tags.data]);

  return {
    isLoading: [
      tags,
      projects,
      statuses,
      customFields,
      fieldsVisibility,
    ].some(({ isLoading }) => isLoading) && Boolean(projectId),
    visibility,
    tagOptions,
    statusOptions,
    projectOptions,
    assigneeOptions,
    customFields: customFields.data || [],
  };
};

export { useFormDeps };
