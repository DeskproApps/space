import has from "lodash/has";
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
import { getInitValues, validationSchema } from "./utils";
import type { FC } from "react";
import type { FormValidationSchema, Props } from "./types";
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
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValidationSchema>({
    defaultValues: getInitValues(issue),
    resolver: zodResolver(validationSchema),
  });
  const {
    isLoading,
    tagOptions,
    statusOptions,
    projectOptions,
    assigneeOptions,
  } = useFormDeps(watch("project"));

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="project" label="Project" required>
        <Select
          id="project"
          disabled={isEditMode}
          initValue={watch("project")}
          options={projectOptions}
          error={has(errors, ["project", "message"])}
          onChange={(value) => setValue("project", value as Project["id"])}
        />
      </Label>

      <Label htmlFor="title" label="Title" required>
        <Input
          id="title"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["title", "message"])}
          value={watch("title")}
          {...register("title")}
        />
      </Label>

      <Label htmlFor="description" label="Description">
        <TextArea
          variant="inline"
          id="description"
          minHeight="auto"
          placeholder="Enter value"
          value={watch("description")}
          error={has(errors, ["description", "message"])}
          {...register("description")}
        />
        <FieldHint>Markdown formatting is supported</FieldHint>
      </Label>

      <Label htmlFor="assignee" label="Assignee">
        <Select<Member["id"]>
          id="assignee"
          initValue={watch("assignee")}
          options={assigneeOptions}
          error={has(errors, ["assignee", "message"])}
          onChange={(value) => setValue("assignee", value as Member["id"])}
        />
      </Label>

      <Label htmlFor="status" label="Status" required>
        <Select
          id="status"
          initValue={watch("status")}
          options={statusOptions}
          error={has(errors, ["status", "message"])}
          onChange={(value) => setValue("status", value as IssueStatus["id"])}
        />
      </Label>

      <Label htmlFor="dueDate" label="Due date">
        <DateInput
          id="dueDate"
          placeholder="DD/MM/YYYY"
          value={watch("dueDate") as Date}
          error={has(errors, ["dueDate", "message"])}
          onChange={(date: [Date]) => setValue("dueDate", date[0])}
        />
      </Label>

      <Label htmlFor="tags" label="Tags">
        <Select
          id="tags"
          initValue={watch("tags")}
          closeOnSelect={false}
          showInternalSearch
          options={tagOptions}
          error={has(errors, ["tags", "message"])}
          onChange={(value) => setValue("tags", value as Array<IssueTag["id"]>)}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text={isEditMode ? "Save" : "Create"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        {onCancel && (
          <Button type="button" text="Cancel" intent="tertiary" onClick={onCancel}/>
        )}
      </Stack>
    </form>
  );
};

export { IssueForm };
