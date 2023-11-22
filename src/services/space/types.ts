export type Response<T> = Promise<T>;

export type SpaceAPIError = {
  error: string,
  error_description: string,
};

export type AccessToken = {
  token_type: "Bearer",
  access_token: string,
  expires_in: number,
  scope: string,
};
