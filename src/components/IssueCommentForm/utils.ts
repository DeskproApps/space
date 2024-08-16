import { z } from "zod";
import type { IssueCommentInput } from "../../services/space/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  comment: z.string().min(1),
});

const getInitValues = () => ({
  comment: "",
});

const getValues = (data: FormValidationSchema): IssueCommentInput => ({
  text: data.comment,
});

export { validationSchema, getInitValues, getValues };
