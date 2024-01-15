export class ApplicationError extends Error {
  statusCode: number

  constructor(message: string, statusCode?: number) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.statusCode = statusCode ?? 404

    this.message = message ?? 'Something went wrong. Please try again.'
  }
}
