import type { SpaceAPIError } from "./types";

export type InitData = {
  status: number,
  data: SpaceAPIError,
};

class SpaceError extends Error {
  status: number;
  data: SpaceAPIError;

  constructor({ status, data }: InitData) {
    const message = "Space Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { SpaceError };
