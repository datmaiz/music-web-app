export class ErrorResponse {
  constructor(public error: string) {

  }
}

export class SuccessResponse<T> {
  constructor(public message: string, public data?: T) {
  }
}