import { z } from "zod";
import {
  validationSchema,
  validationSchemaCustomForm,
} from "./utils";
import type {
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import type { Maybe } from "../../types";
import type {
  Issue,
  Project,
  IssueInput,
  CustomFieldData,
} from "../../services/space/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type CustomFormValidationSchema = z.infer<typeof validationSchemaCustomForm>;

export type Props = {
  onSubmit: (projectId: Project["id"], values: IssueInput) => Promise<void|Issue>,
  onCancel?: () => void,
  isEditMode?: boolean,
  error?: Maybe<string|string[]>,
  issue?: Maybe<Issue>,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomFieldProps<T extends Record<string, any> = Record<string, any>> = {
  projectId: Project["id"],
  field: CustomFieldData,
  formControl: {
    field: ControllerRenderProps<T>,
    fieldState: ControllerFieldState,
    formState: UseFormStateReturn<T>,
  },
};
