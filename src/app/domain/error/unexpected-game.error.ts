export class UnexpectedGameError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = UnexpectedGameError.name;
  }
}
