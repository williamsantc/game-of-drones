export class InvalidMovementError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = InvalidMovementError.name;
  }
}
