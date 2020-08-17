export default class ApiError extends Error {

  public errorCode: string;

  constructor(message: string, errorCode: string) {
    super();
    this.message = message;
    this.errorCode = errorCode;
  }
}
