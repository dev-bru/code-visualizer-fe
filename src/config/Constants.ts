import { ReduxState } from "../utils/types";

export const CODE = {
  OK_CODE: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST_CODE: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED_CODE: 403,
  VALIDATION_CODE: 422,
  INTERNAL_SERVER_ERROR: 500,
  EXPIRE_ACCESSTOKEN_CODE: 401,
  CONFLICT: 409,
  TIMEOUT: 408,
  UNPROCESSABLE_CONTENT: 422,
};

export const initialState: ReduxState = {
  status: false,
  loading: false,
  data: null,
  error: null,
};
