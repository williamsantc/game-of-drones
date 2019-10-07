export class RequiredValueError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = RequiredValueError.name;
  }
}
