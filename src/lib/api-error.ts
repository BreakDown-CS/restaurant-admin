export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly details: Record<string, string>

  constructor(
    status: number,
    message: string,
    code = 'UNKNOWN_ERROR',
    details: Record<string, string> = {},
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}
