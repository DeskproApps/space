import { useMemo } from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getTagsService,
  getProjectsService,
  getIssueStatusesService, getCustomFieldsConfigService,
} from "../../../services/space";
import { QueryKey } from "../../../query";
import { getOptions, getProjectMembers } from "../../../utils";
import { getAssigneeOptions, getStatusOptions, getTagOptions } from "../utils";
import type { Option } from "../../../types";
import type {Project, Member, IssueStatus, IssueTag, CustomFieldData} from "../../../services/space/types";

type UseFormDeps = (projectId?: Project["id"]) => {
  isLoading: boolean,
  projectOptions: Array<Option<Project["id"]>>,
  assigneeOptions: Array<Option<Member["id"]>>,
  statusOptions: Array<Option<IssueStatus["id"]>>,
  tagOptions: Array<Option<IssueTag["id"]>>,
  customFields: CustomFieldData[],
};

const useFormDeps: UseFormDeps = (projectId) => {
  const projects = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);

  const statuses = useQueryWithClient(
    [QueryKey.ISSUE_STATUSES, projectId as Project["id"]],
    (client) => getIssueStatusesService(client, projectId as Project["id"]),
    { enabled: Boolean(projectId) }
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

  const projectOptions = useMemo(() => {
    return getOptions(get(projects.data, ["data"]))
  }, [projects.data]);

  const assigneeOptions = useMemo(() => {
    const project = find(get(projects.data, ["data"]), { id: projectId });
    const members = getProjectMembers(project);

    return getAssigneeOptions(members);
  }, [projects.data, projectId]);

  const statusOptions = useMemo(() => getStatusOptions(statuses.data), [statuses.data]);

  const tagOptions = useMemo(() => {
    return getTagOptions(get(tags.data, ["data"]))
  }, [tags.data]);

  return {
    isLoading: [
      tags,
      projects,
      statuses,
      customFields,
    ].some(({ isLoading }) => isLoading) && Boolean(projectId),
    tagOptions,
    statusOptions,
    projectOptions,
    assigneeOptions,
    customFields: customFields.data || [],
  };
};

export { useFormDeps };
