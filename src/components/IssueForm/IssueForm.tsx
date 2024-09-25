import { useState, useCallback } from "react";
import { has } from "lodash-es";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Stack } from "@deskpro/deskpro-ui";
import { LoadingSpinner, Select, DateInput } from "@deskpro/app-sdk";
import { useFormDeps } from "./hooks";
import {
  Label,
  Button,
  TextArea,
  FieldHint,
  ErrorBlock,
} from "../common";
import { CustomFields } from "./customFields";
import {
  validationSchema,
  getCustomInitValues,
  getProjectFromValues,
  getDefaultInitValues,
  getCustomIssueValues,
  getDefaultIssueValues,
} from "./utils";
import type { FC } from "react";
import type {
  Props,
  FormValidationSchema,
  CustomFormValidationSchema,
} from "./types";
import type {
  Member,
  Project,
  IssueTag,
  IssueStatus,
} from "../../services/space/types";

const IssueForm: FC<Props> = ({
  issue,
  error,
  onSubmit,
  onCancel,
  isEditMode,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const defaultForm = useForm<FormValidationSchema>({
    defaultValues: getDefaultInitValues(issue),
    resolver: zodResolver(validationSchema),
  });
  const {
    isLoading,
    tagOptions,
    statusOptions,
    projectOptions,
    assigneeOptions,
    customFields,
    visibility,
  } = useFormDeps(defaultForm.watch("project"));

  const customForm = useForm<CustomFormValidationSchema>({
    defaultValues: getCustomInitValues(issue, customFields),
    shouldUnregister: true,
  });

  const onClickSubmit = useCallback(async () => {
    const isValid = await defaultForm.trigger();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    onSubmit(getProjectFromValues(defaultForm.getValues()), {
      ...getDefaultIssueValues(defaultForm.getValues()),
      ...getCustomIssueValues(customForm.getValues(), customFields),
    }).finally(() => setIsSubmitting(false));
  }, [onSubmit, defaultForm, customForm, customFields]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {error && <ErrorBlock text={error}/>}

        <Label htmlFor="project" label="Project" required>
          <Select
            id="project"
            disabled={isEditMode}
            initValue={defaultForm.watch("project")}
            options={projectOptions}
            error={has(defaultForm, ["formState", "errors", "project", "message"])}
            onChange={(value) => defaultForm.setValue("project", value as Project["id"])}
          />
        </Label>

        <Label htmlFor="title" label="Title" required>
          <Input
            id="title"
            type="text"
            variant="inline"
            inputsize="small"
            placeholder="Add value"
            error={has(defaultForm.formState.errors, ["title", "message"])}
            value={defaultForm.watch("title")}
            {...defaultForm.register("title")}
          />
        </Label>

        <Label htmlFor="description" label="Description">
          <TextArea
            variant="inline"
            id="description"
            minHeight="auto"
            placeholder="Enter value"
            value={defaultForm.watch("description")}
            error={has(defaultForm, ["formState", "errors", "description", "message"])}
            {...defaultForm.register("description")}
          />
          <FieldHint>Markdown formatting is supported</FieldHint>
        </Label>

        {visibility.ASSIGNEE && (
          <Label htmlFor="assignee" label="Assignee">
            <Select<Member["id"]>
              id="assignee"
              initValue={defaultForm.watch("assignee")}
              options={assigneeOptions}
              error={has(defaultForm, ["formState", "errors", "assignee", "message"])}
              onChange={(value) => defaultForm.setValue("assignee", value as Member["id"])}
            />
          </Label>
        )}

        <Label htmlFor="status" label="Status" required>
          <Select
            id="status"
            initValue={defaultForm.watch("status")}
            options={statusOptions}
            error={has(defaultForm, ["formState", "errors", "status", "message"])}
            onChange={(value) => defaultForm.setValue("status", value as IssueStatus["id"])}
          />
        </Label>

        {visibility.DUE_DATE && (
          <Label htmlFor="dueDate" label="Due date">
            <DateInput
              id="dueDate"
              placeholder="DD/MM/YYYY"
              value={defaultForm.watch("dueDate") as Date}
              error={has(defaultForm, ["formState", "errors", "dueDate", "message"])}
              onChange={(date: [Date]) => defaultForm.setValue("dueDate", date[0])}
            />
          </Label>
        )}

        {visibility.TAG && (
          <Label htmlFor="tags" label="Tags">
            <Select
              id="tags"
              initValue={defaultForm.watch("tags")}
              closeOnSelect={false}
              showInternalSearch
              options={tagOptions}
              error={has(defaultForm, ["formState", "errors", "tags", "message"])}
              onChange={(value) => defaultForm.setValue("tags", value as Array<IssueTag["id"]>)}
            />
          </Label>
        )}
      </form>

      <form onSubmit={(e) => e.preventDefault()}>
        <CustomFields
          projectId={defaultForm.watch("project")}
          control={customForm.control}
          customFields={customFields}
        />
      </form>

      <Stack justify="space-between">
        <Button
          type="button"
          text={isEditMode ? "Save" : "Create"}
          onClick={onClickSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        {onCancel && (
          <Button type="button" text="Cancel" intent="tertiary" onClick={onCancel}/>
        )}
      </Stack>
    </>
  );
};

export { IssueForm };
