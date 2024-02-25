/**
 * A representation of validation errors received from the back end.
 */
export type ValidationErrors = Record<string, string[]>;

export interface ErrorResponseData {
  errors?: ValidationErrors;
}

/**
 * A representation of an error returned from the API.
 */
export class ApiError extends Error {
  public statusCode: number;

  public data: ErrorResponseData;

  constructor(message: string, status: number, data: ErrorResponseData = {}) {
    super(message);
    this.statusCode = status;
    this.data = data;
  }
}
