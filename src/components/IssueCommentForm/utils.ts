import { z } from "zod";
import get from "lodash/get";
import type { IssueCommentInput } from "../../services/space/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  comment: z.string().min(1),
});

const getInitValues = () => ({
  comment: "",
});

const getValues = (data: FormValidationSchema): IssueCommentInput => ({
  text: get(data, ["comment"], ""),
});

export { validationSchema, getInitValues, getValues };
