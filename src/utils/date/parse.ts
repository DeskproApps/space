import fnsParse from "date-fns/parse";
import isValid from "date-fns/isValid";
import { DATE_ON } from "../../constants";
import type { Maybe } from "../../types";

const parse = (date?: string, pattern = DATE_ON): Maybe<Date> => {
  if (!date) {
    return null;
  }

  try {
    const parsedDate = fnsParse(date, pattern, new Date());
    return isValid(parsedDate) ? parsedDate : null;
  } catch (e) {
    return null;
  }
};

export { parse };
