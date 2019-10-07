export class DataNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = DataNotFoundError.name;
  }
}
