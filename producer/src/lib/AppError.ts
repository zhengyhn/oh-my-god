export class AppError extends Error {
  code
  msg

  constructor (msg, code = 1) {
    super(msg)
    this.code = code
    this.msg = msg
  }
}
